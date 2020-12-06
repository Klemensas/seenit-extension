"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderAction = void 0;
const main_1 = require("../main");
var RenderAction;
(function (RenderAction) {
    RenderAction["iframeVideoCb"] = "iframe video callback";
})(RenderAction = exports.RenderAction || (exports.RenderAction = {}));
class RenderService {
    constructor(cb, isIframe = false) {
        this.cb = cb;
        this.isIframe = isIframe;
        this.state = {
            mutationObserver: null,
            videoEl: null,
            videoData: null,
        };
        this.validation = {
            minLength: 360,
        };
        this.port = chrome.runtime.connect({ name: isIframe ? 'iframeContent' : 'videoContent' });
        chrome.runtime.onMessage.addListener((request, sender) => {
            // Page change
            if (request.type === 'tabUpdate') {
                main_1.debugLog(request, sender); // new url is now in content scripts!
                this.initPage();
            }
            this.handleIframeUpdate(request);
        });
        this.initPage();
    }
    initPage() {
        main_1.debugLog('init render');
        this.resetState();
        this.getVideoElement();
    }
    isValidVideoContentMessage(message) {
        if (this.isIframe)
            return false;
        if (typeof message !== 'object')
            return false;
        if (!message)
            return false;
        if ('type' in message)
            return true;
        return false;
    }
    handleIframeUpdate(message) {
        if (!this.isValidVideoContentMessage(message))
            return;
        main_1.debugLog('msg', message);
        switch (message.type) {
            case RenderAction.iframeVideoCb: {
                this.triggerCb(Object.assign(Object.assign({}, message.payload), { 
                    // Ignore iframe titles
                    title: RenderService.getTitlesFromHeading() }));
                break;
            }
            default:
                break;
        }
    }
    resetState() {
        this.removeMutationObserver();
        this.state.videoEl = null;
        this.state.videoData = null;
    }
    getVideoElement() {
        main_1.debugLog('fetch video');
        const videoEl = document.querySelector('video');
        if (videoEl && this.isVideoValid(videoEl)) {
            this.registerVideo(videoEl);
            return;
        }
        this.state.mutationObserver = new MutationObserver(() => {
            var _a;
            const vEl = document.querySelector('video');
            if (!vEl || !this.isVideoValid(vEl)) {
                return;
            }
            (_a = this.state.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
            this.registerVideo(vEl);
        });
        this.state.mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
    isVideoValid(videoEl) {
        return videoEl.duration >= this.validation.minLength;
    }
    registerVideo(videoEl) {
        this.state.videoEl = videoEl;
        videoEl.addEventListener('play', (event) => {
            if (!this.state.videoEl)
                return;
            main_1.debugLog('play', event);
            this.onVideoPlay(this.state.videoEl, event);
        });
        videoEl.addEventListener('pause', (event) => {
            if (!this.state.videoEl)
                return;
            main_1.debugLog('pause', event);
            this.onVideoPause(this.state.videoEl);
        });
        // Endedd triggers pause on netflix, does it everywhere?
        videoEl.addEventListener('ended', (event) => {
            if (!this.state.videoEl)
                return;
            main_1.debugLog('ended', event);
            this.onVideoEnd(this.state.videoEl);
        });
        if (!videoEl.paused) {
            this.onVideoPlay(videoEl);
        }
        main_1.debugLog('registered video, cb time', this.cb);
    }
    onVideoPlay(videoEl, event) {
        const timeTs = videoEl.currentTime;
        if (!this.state.videoData)
            this.onStartVideo(videoEl);
        this.state.videoData = Object.assign(Object.assign({}, this.state.videoData), { isPlaying: true, startTimestamp: timeTs, lastTimestamp: timeTs });
    }
    onVideoPause(videoEl) {
        const title = this.state.videoData && this.state.videoData.title
            ? this.state.videoData.title
            : RenderService.getTitlesFromHeading();
        this.state.videoData = Object.assign(Object.assign({}, this.state.videoData), { title: { name: 'adas-324-sdsa-das-dsa-d' }, isPlaying: false, lastTimestamp: videoEl.currentTime });
        // TODO: should be a part of end
        this.triggerCb(this.state.videoData);
    }
    onVideoEnd(videoEl) {
        this.state.videoData = Object.assign(Object.assign({}, this.state.videoData), { isPlaying: false, lastTimestamp: videoEl.currentTime });
    }
    onStartVideo(videoEl) {
        this.state.videoData = Object.assign(Object.assign({}, this.state.videoData), { playbackStartTime: Date.now(), duration: videoEl.duration, startTimestamp: videoEl.currentTime, title: RenderService.getTitlesFromHeading() });
    }
    triggerCb(videoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield main_1.getSettings();
            main_1.debugLog('pause video');
            if (settings === null || settings === void 0 ? void 0 : settings.extension.blacklist.every((item) => !new RegExp(item, 'i').test(window.location.href))) {
                this.cb(videoData);
            }
        });
    }
    static getTitlesFromHeading() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const potentialTitles = Array.from(headings)
            .sort((a, b) => +a.tagName.slice(1) - +b.tagName.slice(1))
            .filter((node) => RenderService.isValidNode(node));
        const title = potentialTitles[0];
        if (!(title === null || title === void 0 ? void 0 : title.textContent))
            return null;
        const name = title.textContent
            .toLowerCase()
            .replace(/[^\w\d\s]/g, '')
            .replace(/s(eason|eries)?\s?(\d+)\s?e(p|pisode)?\s?(\d+)/m, '')
            .slice(0, 100)
            .trim();
        return Object.assign({ name }, RenderService.extractSeasonFromElement(title));
    }
    static isValidNode(node) {
        if (!node.textContent || !new RegExp('\\w+').test(node.textContent)) {
            return false;
        }
        const brandRegexp = new RegExp('logo|brand', 'gi');
        if (brandRegexp.test(node.id) || brandRegexp.test(node.className)) {
            return false;
        }
        return true;
    }
    static extractSeasonFromElement(title) {
        var _a, _b, _c;
        const titleParent = ((_b = (_a = title.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) || title;
        const match = (_c = titleParent.textContent) === null || _c === void 0 ? void 0 : _c.match(/(s(eason|eries)?[^\w\d]*(\d+))[^\w\d]*(e(p|pisode)?[^\w\d]*(\d+))/im);
        if (!match)
            return null;
        return {
            season: match[3],
            episode: match[6],
        };
    }
    removeMutationObserver() {
        if (!this.state.mutationObserver)
            return;
        this.state.mutationObserver.disconnect();
        this.state.mutationObserver = null;
    }
}
exports.default = RenderService;
//# sourceMappingURL=renderService.js.map