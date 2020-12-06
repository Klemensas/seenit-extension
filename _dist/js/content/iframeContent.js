"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderService_1 = require("./renderService");
(function iframeContent() {
    if (window.self === window.top)
        return;
    const renderService = new renderService_1.default((videoData) => {
        renderService.port.postMessage({
            type: renderService_1.RenderAction.iframeVideoCb,
            payload: videoData,
        });
    }, true);
})();
//# sourceMappingURL=iframeContent.js.map