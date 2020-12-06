"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_apollo_1 = require("react-apollo");
const ReactDOM = require("react-dom");
const react_router_1 = require("react-router");
const core_1 = require("@blueprintjs/core");
const apollo_1 = require("../apollo");
const main_1 = require("../main");
const Content_1 = require("./Content");
const renderService_1 = require("./renderService");
const graphql_1 = require("../graphql");
const render = (videoData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const settings = yield main_1.getSettings();
    if (!settings)
        return;
    let container = document.getElementById('seenit-container');
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('class', 'popup-container');
        container.setAttribute('id', 'seenit-container');
    }
    const targetElement = document.fullscreenElement || document.body;
    targetElement.appendChild(container);
    if (settings.extension.autoTrack) {
        const autoTrackedMutation = yield apollo_1.apolloClient.mutate({
            mutation: graphql_1.AddAutoTrackedDocument,
            variables: {
                createdAt: Date.now(),
                meta: {
                    title: (_a = videoData.title) === null || _a === void 0 ? void 0 : _a.name,
                    tvData: ((_b = videoData.title) === null || _b === void 0 ? void 0 : _b.season) || ((_c = videoData.title) === null || _c === void 0 ? void 0 : _c.episode)
                        ? {
                            season: videoData.title.season,
                            episode: videoData.title.episode,
                        }
                        : null,
                    url: window.location.href,
                    provider: 'extension',
                },
            },
        });
        if (autoTrackedMutation.errors) {
            // TODO: handle errors
            core_1.Toaster.create({
                position: 'top-right',
            }, container).show({
                intent: 'danger',
                message: (React.createElement("div", { className: "text-ellipsis" },
                    React.createElement("span", null, "\u26A0 tracking failed"))),
                // TODO: add retrying and display error
                action: {
                    text: 'Retry',
                },
            });
        }
        else if ((_d = autoTrackedMutation === null || autoTrackedMutation === void 0 ? void 0 : autoTrackedMutation.data) === null || _d === void 0 ? void 0 : _d.addAutoTracked) {
            const autoTrackedData = autoTrackedMutation.data.addAutoTracked;
            const autoTrackedItem = autoTrackedData.item;
            const tvData = autoTrackedData.tvItem;
            if (!autoTrackedItem) {
                core_1.Toaster.create({
                    position: 'top-right',
                }, container).show({
                    intent: 'warning',
                    message: (React.createElement("div", { className: "text-ellipsis" },
                        React.createElement("span", null, "\u2753 couldn't identify tracked item"))),
                    // TODO: add editing functionality. How about undoing/publishing?
                    action: {
                        text: 'Edit',
                    },
                });
                return;
            }
            const name = 'name' in autoTrackedItem ? autoTrackedItem.name : autoTrackedItem.title;
            let tvMeta = '';
            if (tvData) {
                tvMeta =
                    'episode_number' in tvData
                        ? `S${tvData.season.season_number}E${tvData.episode_number}`
                        : `S${tvData.season_number}`;
            }
            core_1.Toaster.create({
                position: 'top-right',
            }, container).show({
                intent: 'success',
                message: (React.createElement("div", { className: "text-ellipsis" },
                    React.createElement("span", null, "\uD83D\uDC4F tracked "),
                    React.createElement("strong", null,
                        tvMeta && React.createElement("span", null,
                            tvMeta,
                            " "),
                        React.createElement("span", null, name)))),
                // TODO: add editing functionality. How about undoing/publishing?
                action: {
                    text: 'Edit',
                },
            });
        }
        return;
    }
    ReactDOM.render(React.createElement(react_router_1.MemoryRouter, null,
        React.createElement(react_apollo_1.ApolloProvider, { client: apollo_1.apolloClient },
            React.createElement(Content_1.default, { videoData: videoData }))), container);
});
exports.default = new renderService_1.default(render);
//# sourceMappingURL=index.js.map