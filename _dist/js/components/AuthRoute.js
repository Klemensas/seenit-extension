"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_1 = require("react-router");
const graphql_1 = require("../graphql");
const apollo_1 = require("../apollo");
function AuthRoute(_a) {
    var { component: Component } = _a, rest = __rest(_a, ["component"]);
    return (React.createElement(graphql_1.IsUserLoggedInComponent, { client: apollo_1.apolloClient }, ({ data }) => {
        return React.createElement(react_router_1.Route, Object.assign({}, rest, { render: () => ((data === null || data === void 0 ? void 0 : data.isLoggedIn) ? React.createElement(Component, null) : React.createElement(react_router_1.Redirect, { to: "/login" })) }));
    }));
}
exports.default = AuthRoute;
//# sourceMappingURL=AuthRoute.js.map