"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoContext = void 0;
const React = require("react");
const react_router_1 = require("react-router");
const Login_1 = require("../auth/Login");
const AuthRoute_1 = require("../components/AuthRoute");
const VideoEnd_1 = require("../watched/VideoEnd");
const CloseContent_1 = require("./CloseContent");
require("./Content.scss");
exports.VideoContext = React.createContext(null);
const Content = ({ videoData }) => {
    return (React.createElement(exports.VideoContext.Provider, { value: videoData },
        React.createElement(CloseContent_1.default, null),
        React.createElement(react_router_1.Switch, null,
            React.createElement(react_router_1.Route, { exact: true, path: "/login", component: Login_1.default }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/", component: VideoEnd_1.default }))));
};
exports.default = Content;
//# sourceMappingURL=Content.js.map