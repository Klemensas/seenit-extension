"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@blueprintjs/core");
const close_1 = require("../utils/close");
function CloseContent() {
    return (React.createElement(core_1.Button, { style: {
            position: 'absolute',
            right: 0,
            top: 0,
        }, icon: "cross", minimal: true, onClick: close_1.closeContent }));
}
exports.default = CloseContent;
//# sourceMappingURL=CloseContent.js.map