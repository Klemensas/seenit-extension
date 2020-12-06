"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/jsx-no-comment-textnodes */
const React = require("react");
const core_1 = require("@blueprintjs/core");
const inputRegex = new RegExp('^(?:(?:(?:https?|ftp|\\*):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:\\*\\.?)?(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+((?:\\*)|(?:[a-z\\u00a1-\\uffff]{2,}\\.?)))(?::\\d{2,5})?(?:[/?#]\\S*)?$', 'i');
function submitItem(value, list, setValue, updateList, setError, hasClashing) {
    if (!value || !inputRegex.test(value)) {
        setError('Invalid address');
        return;
    }
    if (hasClashing) {
        setError('This address is already covered.');
        return;
    }
    const regexVal = `^${value
        .replace(/[.+?^${}()/|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*')
        .toLowerCase()}`;
    // TODO: consider one upping this by also seeing if it's already negated by some rule.
    if (list.includes(regexVal)) {
        setError('This address is already in the list.');
        return;
    }
    updateList([...list, regexVal]);
    setValue('');
}
const Blacklist = ({ id, list, updateList, helperTextPrefix }) => {
    const [input, setInput] = React.useState('');
    const [error, setError] = React.useState('');
    const { list: cleanList, hasClashing } = list.reduce((acc, item) => {
        const matches = !!input && new RegExp(item, 'i').test(input);
        acc.hasClashing = acc.hasClashing || !!matches;
        acc.list.push({
            matches,
            display: item.replace(/\^|\.(\*)|\\/g, '$1'),
        });
        return acc;
    }, { list: [], hasClashing: false });
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.FormGroup, { label: "Blacklisted sites", labelFor: "blacklist-input", helperText: React.createElement(React.Fragment, null,
                helperTextPrefix,
                React.createElement("span", null,
                    "Supports basic wildcards, some supported examples:",
                    React.createElement("br", null),
                    "https://www.netflix.com/watch/80186674",
                    React.createElement("br", null),
                    "*://*.google.com/video/*",
                    React.createElement("br", null)
                //youtube.*
                ,
                    "//youtube.*",
                    React.createElement("br", null),
                    "*://watch.*")) },
            React.createElement(core_1.InputGroup, { id: id, value: input, intent: error ? core_1.Intent.DANGER : core_1.Intent.NONE, placeholder: "https://netflix.com/*", onChange: ({ currentTarget }) => {
                    setInput(currentTarget.value);
                    setError('');
                }, onKeyPress: (event) => event.key === 'Enter'
                    ? submitItem(event.target.value, list, setInput, updateList, setError, hasClashing)
                    : null, rightElement: React.createElement(core_1.Button, { onClick: () => submitItem(input, list, setInput, updateList, setError, hasClashing), icon: "add", minimal: true }) }),
            error ? React.createElement(core_1.Callout, { intent: core_1.Intent.DANGER }, error) : null),
        React.createElement("ul", null, cleanList.map((item, i) => (React.createElement("li", { key: item.display, style: { color: item.matches ? core_1.Colors.RED1 : 'inherit' } },
            item.display,
            React.createElement(core_1.Button, { icon: "delete", intent: item.matches ? core_1.Intent.DANGER : core_1.Intent.NONE, minimal: true, onClick: () => updateList(list.filter((val) => val !== list[i])) })))))));
};
exports.default = Blacklist;
//# sourceMappingURL=Blacklist.js.map