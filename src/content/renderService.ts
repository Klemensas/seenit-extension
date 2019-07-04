import { debugLog, settings } from '../main';

export interface RenderServiceState {
  mutationObserver: MutationObserver;
  videoEl: HTMLVideoElement;
  videoData: VideoData;
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
  title: Title;
  isPlaying: boolean;
  startTimestamp: number;
  lastTimestamp: number;
  playbackStartTime: number;
  duration: number;
}

export enum RenderAction {
  iframeVideoCb = 'iframe video callback',
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

  public handleIframeUpdate(message) {
    if (this.isIframe) {
      return;
    }

    console.log('msg', message);
    switch (message.type) {
      case RenderAction.iframeVideoCb: {
        console.log('triggg');
        this.triggerCb(message.payload);
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

      this.state.mutationObserver.disconnect();
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

    videoEl.addEventListener('play', event => {
      debugLog('play', event);
      this.onVideoPlay(this.state.videoEl, event);
    });
    videoEl.addEventListener('pause', event => {
      debugLog('pause', event);
      this.onVideoPause(this.state.videoEl);
    });
    // Endedd triggers pause on netflix, does it everywhere?
    videoEl.addEventListener('ended', event => {
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
    if (!this.state.videoData) {
      this.onStartVideo(videoEl);
    }

    this.state.videoData = {
      ...this.state.videoData,
      isPlaying: true,
      startTimestamp: timeTs,
      lastTimestamp: timeTs,
    };
  }

  private onVideoPause(videoEl: HTMLVideoElement) {
    const title =
      this.state.videoData && this.state.videoData.title
        ? this.state.videoData.title
        : RenderService.getTitlesFromHeading();
    this.state.videoData = {
      ...this.state.videoData,
      title,
      isPlaying: false,
      lastTimestamp: videoEl.currentTime,
    };

    // TODO: should be a part of end
    this.triggerCb(this.state.videoData);
  }

  private onVideoEnd(videoEl: HTMLVideoElement) {
    this.state.videoData = {
      ...this.state.videoData,
      isPlaying: false,
      lastTimestamp: videoEl.currentTime,
    };
  }

  private onStartVideo(videoEl: HTMLVideoElement) {
    this.state.videoData = {
      ...this.state.videoData,
      playbackStartTime: Date.now(),
      duration: videoEl.duration,
      startTimestamp: videoEl.currentTime,
      title: RenderService.getTitlesFromHeading(),
    };
  }

  private triggerCb(videoData: VideoData) {
    debugLog('pause video');
    if (settings.blacklist.every(item => !new RegExp(item, 'i').test(window.location.href))) {
      this.cb(videoData);
    }
  }

  public static getTitlesFromHeading(): Title {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const potentialTitles = Array.from(headings)
      .sort((a, b) => +a.tagName.slice(1) - +b.tagName.slice(1))
      .filter(node => RenderService.isValidNode(node));
    const title = potentialTitles[0];

    if (!title) {
      return null;
    }

    const name = title.textContent;
    return {
      name,
      ...RenderService.extractSeasonFromElement(title),
    };
  }

  public static isValidNode(node: Element) {
    if (!node.textContent || !new RegExp('\\w+').test(node.textContent)) {
      return false;
    }

    const brandRegexp = new RegExp('logo|brand', 'gi');
    if (brandRegexp.test(node.id) || brandRegexp.test(node.className)) {
      return false;
    }

    return true;
  }

  public static extractSeasonFromElement(title: Element): TvData {
    let titleParent: Element;
    try {
      titleParent = title.parentElement.parentElement.parentElement;
    } catch {
      titleParent = title;
    }

    const match = titleParent.textContent.match(/(s(eason)?\s?(\d+)).?(e(pisode)?\s?(\d+))/im);
    if (!match) {
      return null;
    }

    return {
      season: match[3],
      episode: match[6],
    };
  }

  private removeMutationObserver() {
    if (this.state.mutationObserver) {
      this.state.mutationObserver.disconnect();
      this.state.mutationObserver = null;
    }
  }
}
