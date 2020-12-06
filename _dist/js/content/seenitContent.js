"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("../common/storage");
document.addEventListener('seenit-login', () => {
    // TODO: user might be already logged, are we sure we want to override?
    const token = JSON.parse(localStorage.getItem('seenit-web-token') || '');
    storage_1.updateStorage({
        token,
    });
});
//# sourceMappingURL=seenitContent.js.map