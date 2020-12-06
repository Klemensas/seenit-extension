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
const storage_1 = require("../common/storage");
chrome.runtime.onInstalled.addListener((event) => __awaiter(void 0, void 0, void 0, function* () {
    // chrome.browserAction.setIcon({ path: 'icon48-inactive.png' });
    const { token } = yield storage_1.getStorageValue('token');
    if (!token)
        chrome.browserAction.setIcon({ path: 'icon48-inactive.png' });
}));
storage_1.addStoreChangeListener(({ newValue }) => {
    const isActive = !!newValue;
    const iconPath = `icon48${isActive ? '' : '-inactive'}.png`;
    chrome.browserAction.setIcon({ path: iconPath });
}, 'token');
// Listen for when tab updates?
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Ignroe pending updates
    if (!changeInfo || changeInfo.status !== 'complete')
        return;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!(tabs === null || tabs === void 0 ? void 0 : tabs[0].id))
            return;
        chrome.tabs.sendMessage(tabs[0].id, { type: 'tabUpdate', changeInfo, tab });
    });
});
function setupVideoContentPort(port) {
    // videoContentPorts.push(port);
}
function setupIframeContentPort(port) {
    var _a, _b;
    const tabId = (_b = (_a = port.sender) === null || _a === void 0 ? void 0 : _a.tab) === null || _b === void 0 ? void 0 : _b.id;
    if (!tabId)
        return;
    port.onMessage.addListener((message) => {
        chrome.tabs.sendMessage(tabId, message);
    });
}
chrome.runtime.onConnect.addListener((port) => {
    switch (port.name) {
        case 'videoContent': {
            setupVideoContentPort(port);
            break;
        }
        case 'iframeContent': {
            setupIframeContentPort(port);
            break;
        }
        default:
            break;
    }
});
//# sourceMappingURL=index.js.map