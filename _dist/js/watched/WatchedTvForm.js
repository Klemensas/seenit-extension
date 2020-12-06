"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const formik_1 = require("formik");
const react_rating_1 = require("react-rating");
const core_1 = require("@blueprintjs/core");
const datetime_1 = require("@blueprintjs/datetime");
const select_1 = require("@blueprintjs/select");
const graphql_1 = require("../graphql");
// interface ItemSelection {
//   id: string;
//   name: string;
//   seasonName: string;
//   lastSeasonEpisode: boolean;
//   lastSeason: boolean;
// }
const renderEpisode = (episode, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (React.createElement(React.Fragment, { key: episode.id },
        React.createElement(core_1.MenuItem, { active: modifiers.active, text: episode.name, label: episode.seasonName, onClick: handleClick }),
        !query && episode.lastSeasonEpisode && !episode.lastSeason && React.createElement(core_1.MenuDivider, null)));
};
const itemFilter = (query, items) => items.filter(({ name, seasonName }) => `${name} ${seasonName}`.toLowerCase().includes(query.toLowerCase()));
const getSelectOptions = (seasons) => 
// seasons.reduce((acc: ItemSelection[], { season_number: season, episodes }, seasonIndex) => {
seasons.reduce((acc, { season_number: season, episodes }, seasonIndex) => {
    acc.push(...episodes.map(({ id, name, episode_number: episode }, episodeIndex) => ({
        id,
        name,
        seasonName: season ? `S${season}E${episode}` : '',
        value: { season, episode },
        lastSeasonEpisode: episodeIndex + 1 === episodes.length,
        lastSeason: seasonIndex + 1 === seasons.length,
    })));
    return acc;
}, []);
const WatchedTvForm = ({ item, season, episode, onSubmit, isLoading }) => {
    const seasons = item.seasons || [];
    const options = getSelectOptions(seasons);
    const tvData = season || episode
        ? {
            season,
            episode,
        }
        : null;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { display: 'flex' } },
            item.poster_path ? (React.createElement("div", null,
                React.createElement("img", { src: `https://image.tmdb.org/t/p/w92${item.poster_path}`, alt: "" }))) : null,
            React.createElement("div", { style: { padding: '0 0.5em' } },
                "Did you enjoy watching ",
                item.name,
                "?")),
        React.createElement(formik_1.Formik, { 
            // <Formik
            initialValues: {
                review: '',
                rating: null,
                createdAt: Date.now(),
                tvData,
                tvItemId: '',
            }, onSubmit: (values, actions) => onSubmit({
                variables: Object.assign(Object.assign({}, values), { itemId: item.id, itemType: graphql_1.ItemType.Tv, tvItemType: values.tvItemId ? graphql_1.TvItemType.Episode : undefined, tvItemId: values.tvItemId, rating: values.rating
                        ? {
                            value: values.rating,
                        }
                        : undefined, review: values.review
                        ? {
                            body: values.review,
                        }
                        : undefined }),
            }).then(() => actions.setSubmitting(false)) }, ({ values, handleChange, handleSubmit, setFieldValue }) => (React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(core_1.FormGroup, { label: "Date", labelFor: "createdAt" },
                React.createElement(datetime_1.DateInput, { popoverProps: {
                        fill: true,
                    }, formatDate: (date) => date.toLocaleString(), parseDate: (str) => new Date(str), placeholder: "M/D/YYYY", onChange: (date) => setFieldValue('createdAt', +new Date(date)), value: new Date(values.createdAt) })),
            React.createElement(core_1.FormGroup, { label: "Episode", labelFor: "tvItemId", helperText: "Empty episode field indicates the whole show" },
                React.createElement(select_1.Suggest, { selectedItem: options.find(({ id }) => id === values.tvItemId) || null, inputValueRenderer: ({ name }) => name, itemRenderer: renderEpisode, items: options, itemListPredicate: itemFilter, onItemSelect: ({ id }) => setFieldValue('tvItemId', id), noResults: React.createElement(core_1.MenuItem, { disabled: true, text: "Got nothing :(" }), popoverProps: {
                        minimal: true,
                        fill: true,
                        usePortal: false,
                        position: core_1.PopoverPosition.BOTTOM,
                    }, inputProps: {
                        placeholder: 'Select an episode',
                        rightElement: (React.createElement(core_1.Tooltip, { content: "Clear selection" },
                            React.createElement(core_1.Button, { icon: "cross", minimal: true, onClick: () => setFieldValue('tvItemId', null) }))),
                    } })),
            React.createElement(core_1.FormGroup, { label: "Review", labelFor: "review" },
                React.createElement(core_1.TextArea, { fill: true, growVertically: true, large: true, name: "review", onChange: handleChange, value: values.review })),
            React.createElement(core_1.FormGroup, { label: "Rating", labelFor: "rating" },
                React.createElement(react_rating_1.default, { initialRating: values.rating || undefined, fractions: 2, onChange: (value) => setFieldValue('rating', value) })),
            React.createElement(core_1.Button, { type: "submit", large: true, fill: true, intent: core_1.Intent.PRIMARY, loading: isLoading }, "Add"))))));
};
exports.default = WatchedTvForm;
//# sourceMappingURL=WatchedTvForm.js.map