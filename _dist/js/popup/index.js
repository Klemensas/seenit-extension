"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_apollo_1 = require("react-apollo");
const ReactDOM = require("react-dom");
const react_router_1 = require("react-router");
const apollo_1 = require("../apollo");
const Popup_1 = require("./Popup");
chrome.tabs.query({ active: true, currentWindow: true }, () => {
    ReactDOM.render(React.createElement(react_router_1.MemoryRouter, null,
        React.createElement(react_apollo_1.ApolloProvider, { client: apollo_1.apolloClient },
            React.createElement(Popup_1.default, null))), document.getElementById('seenit-popup'));
});
//# sourceMappingURL=index.js.map