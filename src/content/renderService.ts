import { debugLog, getStorageSettings } from '../main';
import { normalizeUrl } from '../utils/helpers';

export interface RenderServiceState {
  mutationObserver: MutationObserver | null;
  videoEl: HTMLVideoElement | null;
  videoData: VideoData | null;
}

export interface TvData {
  episode: string;
  season: string;
}

export interface Title extends Partial<TvData> {
  name: string;
}

// TODO: consider if we want to fetch multiple title candidates
export interface VideoData {
  title: Title | null;
  isPlaying: boolean;
  startTimestamp: number;
  lastTimestamp: number;
  playbackStartTime: number;
  duration: number;
}

export enum RenderAction {
  iframeVideoCb = 'iframe video callback',
}

export interface IframeVideoCallback {
  type: RenderAction.iframeVideoCb;
  payload: VideoData;
}

export default class RenderService {
  public state: RenderServiceState = {
    mutationObserver: null,
    videoEl: null,
    videoData: null,
    // playbackStartTime: null,
    // duration: null,
    // startTimestamp: null,
  };

  public port: chrome.runtime.Port;

  public validation = {
    minLength: 360,
  };

  constructor(private cb: Function, private isIframe = false) {
    this.port = chrome.runtime.connect({ name: isIframe ? 'iframeContent' : 'videoContent' });
    chrome.runtime.onMessage.addListener((request, sender) => {
      // Page change
      if (request.type === 'tabUpdate') {
        debugLog(request, sender); // new url is now in content scripts!
        this.initPage();
      }

      this.handleIframeUpdate(request);
    });

    this.initPage();
  }

  public initPage() {
    debugLog('init render');
    this.resetState();
    this.getVideoElement();
  }

  public isValidVideoContentMessage(message: unknown): message is IframeVideoCallback {
    if (this.isIframe) return false;
    if (typeof message !== 'object') return false;
    if (!message) return false;
    if ('type' in message) return true;

    return false;
  }

  public handleIframeUpdate(message: unknown) {
    if (!this.isValidVideoContentMessage(message)) return;

    debugLog('msg', message);

    switch (message.type) {
      case RenderAction.iframeVideoCb: {
        this.triggerCb({
          ...message.payload,
          // Ignore iframe titles
          title: RenderService.getTitlesFromHeading(),
        });
        break;
      }
      default:
        break;
    }
  }

  private resetState() {
    this.removeMutationObserver();
    this.state.videoEl = null;
    this.state.videoData = null;
  }

  private getVideoElement() {
    debugLog('fetch video');
    const videoEl = document.querySelector('video');
    if (videoEl && this.isVideoValid(videoEl)) {
      this.registerVideo(videoEl);
      return;
    }

    this.state.mutationObserver = new MutationObserver(() => {
      const vEl = document.querySelector('video');
      if (!vEl || !this.isVideoValid(vEl)) {
        return;
      }

      this.state.mutationObserver?.disconnect();
      this.registerVideo(vEl);
    });
    this.state.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private isVideoValid(videoEl: HTMLVideoElement) {
    return videoEl.duration >= this.validation.minLength;
  }

  private registerVideo(videoEl: HTMLVideoElement) {
    this.state.videoEl = videoEl;

    videoEl.addEventListener('play', (event) => {
      if (!this.state.videoEl) return;

      debugLog('play', event);
      this.onVideoPlay(this.state.videoEl, event);
    });
    videoEl.addEventListener('pause', (event) => {
      if (!this.state.videoEl) return;

      debugLog('pause', event);
      this.onVideoPause(this.state.videoEl);
    });
    // Endedd triggers pause on netflix, does it everywhere?
    videoEl.addEventListener('ended', (event) => {
      if (!this.state.videoEl) return;

      debugLog('ended', event);
      this.onVideoEnd(this.state.videoEl);
    });

    if (!videoEl.paused) {
      this.onVideoPlay(videoEl);
    }

    debugLog('registered video, cb time', this.cb);
  }

  private onVideoPlay(videoEl: HTMLVideoElement, event?: Event) {
    const timeTs = videoEl.currentTime;

    if (!this.state.videoData) this.onStartVideo(videoEl);

    this.state.videoData = {
      ...(this.state.videoData as VideoData),
      isPlaying: true,
      startTimestamp: timeTs,
      lastTimestamp: timeTs,
    };
  }

  private onVideoPause(videoEl: HTMLVideoElement) {
    this.state.videoData = {
      ...(this.state.videoData as VideoData),
      isPlaying: false,
      lastTimestamp: videoEl.currentTime,
    };

    if (!process.env.TRACK_ON_PAUSE) return;

    this.triggerCb(this.state.videoData);
  }

  private onVideoEnd(videoEl: HTMLVideoElement) {
    this.state.videoData = {
      ...(this.state.videoData as VideoData),
      isPlaying: false,
      lastTimestamp: videoEl.currentTime,
    };

    this.triggerCb(this.state.videoData);
  }

  private onStartVideo(videoEl: HTMLVideoElement) {
    this.state.videoData = {
      ...(this.state.videoData as VideoData),
      playbackStartTime: Date.now(),
      duration: videoEl.duration,
      startTimestamp: videoEl.currentTime,
      title: RenderService.getTitlesFromHeading(),
    };
  }

  private async triggerCb(videoData: VideoData) {
    const settings = await getStorageSettings();
    const isBlacklisted = settings.extension.blacklist.some((item) => new RegExp(item, 'i').test(normalizeUrl()));
    debugLog('pause video');

    if (isBlacklisted) return;

    this.cb(videoData);
  }

  public static getTitlesFromHeading(): Title | null {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const potentialTitles = Array.from(headings)
      .sort((a, b) => +a.tagName.slice(1) - +b.tagName.slice(1))
      .filter((node) => RenderService.isValidNode(node));

    // Pick 1st element that has any text
    const title = potentialTitles.find((node) => !!node.textContent);

    if (!title?.textContent) return null;

    // TODO: break title further down and check for element identification (classes: title and episode), consider sending an array of potential targets, narrowing down

    const name = title.textContent
      .toLowerCase()
      .replace(/[^\w\d\s]/g, '')
      .replace(/s(eason|eries)?\s?(\d+)\s?e(p|pisode)?\s?(\d+)/m, '')
      .slice(0, 100)
      .trim();

    return {
      name,
      ...RenderService.extractSeasonFromElement(title),
    };
  }

  public static isValidNode(node: Element) {
    if (!node.textContent || !new RegExp('\\w+').test(node.textContent)) return false;

    const brandRegexp = new RegExp('logo|brand', 'gi');
    if (brandRegexp.test(node.id) || brandRegexp.test(node.className)) return false;

    return true;
  }

  public static extractSeasonFromElement(title: Element): TvData | null {
    const titleParent = title.parentElement?.parentElement?.parentElement || title;

    const match = titleParent.textContent?.match(/(s(eason|eries)?[^\w\d]*(\d+))[^\w\d]*(e(p|pisode)?[^\w\d]*(\d+))/im);

    if (!match) return null;

    return {
      season: match[3],
      episode: match[6],
    };
  }

  private removeMutationObserver() {
    if (!this.state.mutationObserver) return;

    this.state.mutationObserver.disconnect();
    this.state.mutationObserver = null;
  }
}
