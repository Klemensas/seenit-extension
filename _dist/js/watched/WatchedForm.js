"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const graphql_1 = require("../graphql");
const WatchedMovieForm_1 = require("./WatchedMovieForm");
const WatchedTvForm_1 = require("./WatchedTvForm");
const typeParams = {
    [graphql_1.ItemType.Movie]: [graphql_1.useMovieQuery, WatchedMovieForm_1.default],
    [graphql_1.ItemType.Tv]: [graphql_1.useTvQuery, WatchedTvForm_1.default],
};
const WatchedForm = ({ id, type, season, episode, onSave }) => {
    const [addWatched, { loading: loadingWatched, data: mutationResult }] = graphql_1.useAddWatchedMutation();
    if (mutationResult && onSave) {
        onSave();
    }
    const query = type === graphql_1.ItemType.Movie ? graphql_1.useMovieQuery : graphql_1.useTvQuery;
    const { data, loading } = query({
        variables: { id },
    });
    if (loading || !data) {
        return React.createElement("div", null, "Loading...");
    }
    const partialProps = {
        season,
        episode,
        onSubmit: addWatched,
        isLoading: loadingWatched,
    };
    if ('movie' in data)
        return React.createElement(WatchedMovieForm_1.default, Object.assign({}, partialProps, { item: data.movie }));
    return React.createElement(WatchedTvForm_1.default, Object.assign({}, partialProps, { item: data.tv }));
};
exports.default = WatchedForm;
//# sourceMappingURL=WatchedForm.js.map