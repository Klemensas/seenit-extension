"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Search_1 = require("../watched/Search");
const WatchedForm_1 = require("../watched/WatchedForm");
const RecentWatched = () => {
    const [selected, setSelected] = React.useState(null);
    if (!selected) {
        return (React.createElement(React.Fragment, null,
            React.createElement("h3", { className: "bp3-heading" }, "Watched anything recently?"),
            React.createElement(Search_1.default, { selected: selected || undefined, setSelected: setSelected })));
    }
    return React.createElement(WatchedForm_1.default, { id: selected.id, type: selected.type });
};
exports.default = RecentWatched;
//# sourceMappingURL=RecentWatched.js.map