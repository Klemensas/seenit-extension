"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStoreChangeListener = exports.updateStorage = exports.getStorageValue = void 0;
function getStorageValue(...keys) {
    return new Promise((resolve) => chrome.storage.sync.get(keys, (value) => resolve(value)));
}
exports.getStorageValue = getStorageValue;
function updateStorage(value) {
    return new Promise((resolve) => chrome.storage.sync.set(value, resolve));
}
exports.updateStorage = updateStorage;
const registeredCallbacks = {};
function addStoreChangeListener(callback, target) {
    const targetCallbacks = registeredCallbacks[target] || [];
    registeredCallbacks[target] = [...targetCallbacks, callback];
}
exports.addStoreChangeListener = addStoreChangeListener;
chrome.storage.onChanged.addListener((changes) => {
    if (!Object.keys(registeredCallbacks).length)
        return;
    Object.entries(changes).forEach(([key, value]) => registeredCallbacks[key].forEach((cb) => cb(value)));
});
//# sourceMappingURL=storage.js.map