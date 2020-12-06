"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_spring_1 = require("react-spring");
const ProgressBar = ({ duration, onStart, onRest }) => {
    const { value } = react_spring_1.useSpring({ value: 0, from: { value: 100 }, config: { duration }, onRest, onStart });
    return (React.createElement("div", { className: "bp3-progress-bar bp3-progress-bar--custom bp3-intent-success bp3-no-stripes" },
        React.createElement(react_spring_1.animated.div, { className: "bp3-progress-meter", style: { width: value.interpolate((v) => `${v}%`) } })));
};
ProgressBar.defaultProps = {
    onStart: () => { },
};
exports.default = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map