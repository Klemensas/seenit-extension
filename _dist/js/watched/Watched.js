"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const graphql_1 = require("../graphql");
function Watched() {
    // const {
    //   data: { userData },
    // } = useUserDataQuery();
    const { data: userDataQuery } = graphql_1.useUserDataQuery();
    const { data, loading } = graphql_1.useUserWatchedQuery({
        variables: { id: (userDataQuery === null || userDataQuery === void 0 ? void 0 : userDataQuery.userData.id) || '' },
        skip: !userDataQuery,
    });
    if (loading || !data) {
        return React.createElement("div", null, "Loading...");
    }
    const { watched } = data.user;
    return (React.createElement("div", { className: "watched-wrapper", style: { display: 'flex' } }, watched.watched.map(({ item }) => (React.createElement("div", { key: item.id, style: { position: 'relative', minWidth: 154 } },
        React.createElement("div", { style: {
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 0.5em',
                fontSize: '0.75em',
            } },
            React.createElement("span", null, item.name || item.title)),
        React.createElement("img", { src: `https://image.tmdb.org/t/p/w154${item.poster_path}`, style: { position: 'relative' }, alt: "" }))))));
}
exports.default = Watched;
//# sourceMappingURL=Watched.js.map