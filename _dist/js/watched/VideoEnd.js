"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@blueprintjs/core");
const graphql_1 = require("../graphql");
const Content_1 = require("../content/Content");
const Search_1 = require("./Search");
const WatchedForm_1 = require("./WatchedForm");
const ProgressBar_1 = require("../components/ProgressBar");
const close_1 = require("../utils/close");
function renderSearch(setSelected, prefix = React.createElement("div", null, "Couldn't find your watched title")) {
    return (React.createElement(React.Fragment, null,
        prefix,
        React.createElement(Search_1.default, { setSelected: setSelected })));
}
const VideoEnd = () => {
    const videoData = React.useContext(Content_1.VideoContext);
    const [selected, setSelected] = React.useState(null);
    const [searching, setSearching] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);
    const title = (videoData === null || videoData === void 0 ? void 0 : videoData.title) || null;
    const { data, loading, error } = graphql_1.useSearchContentQuery({
        // TODO: this is needed because title type says it can be undefined, but skip prevents that. See if this can be changed
        variables: { title: (title === null || title === void 0 ? void 0 : title.name) || '' },
        skip: !title,
    });
    if (!title && !selected) {
        return renderSearch(setSelected);
    }
    let items = [];
    if (data && data.searchContent) {
        const { searchContent } = data;
        items = searchContent;
    }
    const item = items[0];
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    if (error) {
        return React.createElement("div", null, "Unexpected error!");
    }
    if (!items.length && !selected) {
        return renderSearch(setSelected);
    }
    if (isSaved) {
        return (React.createElement("div", { className: "flex flex-direction-column flex-align-items-center" },
            React.createElement(core_1.Icon, { icon: "tick", iconSize: 64, intent: "success" }),
            React.createElement("h4", { className: "bp3-heading" }, "Success"),
            React.createElement(core_1.Text, { tagName: "p", className: "mb-4" }, "The show was added to your watched item list"),
            React.createElement(ProgressBar_1.default, { duration: 2500, onRest: close_1.closeContent })));
    }
    const target = selected || item;
    const season = ((title === null || title === void 0 ? void 0 : title.season) && parseInt(title.season, 10)) || undefined;
    const episode = ((title === null || title === void 0 ? void 0 : title.episode) && parseInt(title.episode, 10)) || undefined;
    const props = {
        id: target.id,
        type: target.type,
        season,
        episode,
        onSave: () => setIsSaved(true),
    };
    return (React.createElement(React.Fragment, null,
        searching ? (renderSearch(setSelected, null)) : (React.createElement("p", { style: { fontSize: '0.8em' } },
            "Not what you watched?\u00A0",
            React.createElement(core_1.Button, { type: "button", onClick: () => setSearching(true) }, "Search"))),
        React.createElement(WatchedForm_1.default, Object.assign({}, props))));
};
exports.default = VideoEnd;
//# sourceMappingURL=VideoEnd.js.map