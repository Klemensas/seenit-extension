"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const formik_1 = require("formik");
const react_rating_1 = require("react-rating");
const core_1 = require("@blueprintjs/core");
const datetime_1 = require("@blueprintjs/datetime");
const graphql_1 = require("../graphql");
const WatchedMovieForm = ({ item, onSubmit, isLoading }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { display: 'flex' } },
            item.poster_path ? (React.createElement("div", null,
                React.createElement("img", { src: `https://image.tmdb.org/t/p/w92${item.poster_path}`, alt: "" }))) : null,
            React.createElement("div", { style: { padding: '0 0.5em' } },
                "Did you enjoy watching ",
                item.title,
                "?")),
        React.createElement(formik_1.Formik, { enableReinitialize: true, initialValues: {
                review: '',
                rating: null,
                createdAt: Date.now(),
            }, onSubmit: (values, actions) => {
                onSubmit({
                    variables: Object.assign(Object.assign({}, values), { itemId: item.id, itemType: graphql_1.ItemType.Movie, rating: values.rating
                            ? {
                                value: values.rating,
                            }
                            : undefined, review: values.review
                            ? {
                                body: values.review,
                            }
                            : undefined }),
                }).then(() => actions.setSubmitting(false));
            } }, ({ values, handleChange, handleSubmit, setFieldValue }) => (React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(core_1.FormGroup, { label: "Date", labelFor: "createdAt" },
                React.createElement(datetime_1.DateInput, { popoverProps: {
                        fill: true,
                    }, formatDate: (date) => date.toLocaleString(), parseDate: (str) => new Date(str), placeholder: "M/D/YYYY", onChange: (date) => setFieldValue('createdAt', +new Date(date)), value: new Date(values.createdAt) })),
            React.createElement(core_1.FormGroup, { label: "Review", labelFor: "review" },
                React.createElement(core_1.TextArea, { fill: true, growVertically: true, large: true, name: "review", onChange: handleChange, value: values.review })),
            React.createElement(core_1.FormGroup, { label: "Rating", labelFor: "rating" },
                React.createElement(react_rating_1.default, { initialRating: values.rating || undefined, fractions: 2, onChange: (value) => setFieldValue('rating', value) })),
            React.createElement(core_1.Button, { type: "submit", large: true, fill: true, intent: core_1.Intent.PRIMARY, loading: isLoading }, "Add"))))));
};
exports.default = WatchedMovieForm;
//# sourceMappingURL=WatchedMovieForm.js.map