"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = void 0;
const React = require("react");
const react_router_1 = require("react-router");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const core_1 = require("@blueprintjs/core");
const graphql_1 = require("../graphql");
const Login_1 = require("../auth/Login");
const AuthRoute_1 = require("../components/AuthRoute");
const RecentWatched_1 = require("./RecentWatched");
const Settings_1 = require("./Settings");
const helpers_1 = require("../utils/helpers");
require("./Popup.scss");
function Logo() {
    return (React.createElement("div", { className: "seenit-logo" },
        "S",
        React.createElement("span", { className: "logo-eyes", role: "img", "aria-label": "ee" }, "\uD83D\uDC40"),
        "N\u00A0IT"));
}
exports.Logo = Logo;
function Popup() {
    const [logout] = graphql_1.useLogoutMutation();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "navigation-container" },
            React.createElement(core_1.Navbar, { fixedToTop: true },
                React.createElement(core_1.Navbar.Group, { align: core_1.Alignment.LEFT },
                    React.createElement(core_1.Navbar.Heading, null,
                        React.createElement(Logo, null)),
                    React.createElement(core_1.Navbar.Divider, null),
                    React.createElement(react_router_dom_1.NavLink, { to: "/" },
                        React.createElement(core_1.Button, { minimal: true }, "Add item")),
                    React.createElement(react_router_dom_1.NavLink, { to: "/settings" },
                        React.createElement(core_1.Button, { minimal: true }, "Settings"))),
                React.createElement(core_1.Navbar.Group, { align: core_1.Alignment.RIGHT },
                    React.createElement(core_1.Navbar.Divider, null),
                    !helpers_1.isProduction && React.createElement(core_1.Button, { minimal: true, icon: "refresh", onClick: () => chrome.runtime.reload() }),
                    React.createElement(core_1.Button, { minimal: true, icon: "log-out", onClick: () => logout() })))),
        React.createElement("div", { className: "content-container" },
            React.createElement(react_router_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/login", component: Login_1.default }),
                React.createElement(AuthRoute_1.default, { exact: true, path: "/", component: RecentWatched_1.default }),
                React.createElement(AuthRoute_1.default, { exact: true, path: "/settings", component: Settings_1.default })),
            React.createElement(react_toastify_1.ToastContainer, null))));
}
exports.default = Popup;
//# sourceMappingURL=Popup.js.map