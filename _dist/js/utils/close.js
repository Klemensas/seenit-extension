"use strict";
/* eslint-disable import/prefer-default-export */
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeContent = void 0;
exports.closeContent = () => {
    var _a;
    const container = document.getElementById('seenit-container');
    (_a = container === null || container === void 0 ? void 0 : container.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(container);
};
//# sourceMappingURL=close.js.map