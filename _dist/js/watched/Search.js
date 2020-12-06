"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@blueprintjs/core");
const select_1 = require("@blueprintjs/select");
const graphql_1 = require("../graphql");
const renderOption = ({ label, item }, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return React.createElement(core_1.MenuItem, { active: modifiers.active, key: item.id, text: label, onClick: handleClick });
};
const Search = ({ selected, setSelected }) => {
    const [query, setQuery] = React.useState('');
    const searchQuery = graphql_1.useSearchContentQuery({
        variables: { title: query },
        skip: !query,
    });
    const options = searchQuery.data && searchQuery.data.searchContent
        ? searchQuery.data.searchContent.reduce((acc, item) => acc.concat({
            label: `${item.title} (${(item.release_date || '?').split('-')[0]})`,
            value: item.id,
            item,
        }), [])
        : [];
    return (React.createElement(select_1.Select, { itemRenderer: renderOption, items: options, onQueryChange: (payload) => setQuery(payload), onItemSelect: ({ item }) => setSelected(item), noResults: React.createElement("div", null, "Got nothing :("), initialContent: null, popoverProps: {
            minimal: true,
            fill: true,
            usePortal: false,
            position: core_1.PopoverPosition.BOTTOM,
        }, className: "select-popover-centered" },
        React.createElement(core_1.Button, { loading: searchQuery.loading, large: true, minimal: true, text: selected ? selected.title : 'Search...', className: "bp3-fill" })));
};
exports.default = Search;
//# sourceMappingURL=Search.js.map