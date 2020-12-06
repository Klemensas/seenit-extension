"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const formik_1 = require("formik");
const core_1 = require("@blueprintjs/core");
const Blacklist_1 = require("./Blacklist");
const graphql_1 = require("../graphql");
const helpers_1 = require("../common/apollo/helpers");
const Settings = () => {
    const { data: settingsData, loading } = graphql_1.useSettingsQuery();
    const { data: localUser } = graphql_1.useUserDataQuery();
    const currentSettings = settingsData === null || settingsData === void 0 ? void 0 : settingsData.settings;
    const [updateSettings] = graphql_1.useUpdateSettingsMutation({
        update: (cache, { data }) => {
            if (!data || !localUser)
                return;
            helpers_1.updateUserSettings(cache, Object.assign(Object.assign({}, localUser.userData), { settings: data.updateSettings }));
        },
    });
    const form = loading || !currentSettings
        ? null
        : {
            general: {
                autoConvert: currentSettings.general.autoConvert,
            },
            extension: {
                autoTrack: currentSettings.extension.autoTrack,
                minLengthSeconds: currentSettings.extension.minLengthSeconds,
                blacklist: currentSettings.extension.blacklist,
            },
        };
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.H3, null, "Settings"),
        !form ? (React.createElement(core_1.Spinner, { size: 16 })) : (React.createElement(formik_1.Formik, { onSubmit: (values) => updateSettings({ variables: values }), enableReinitialize: true, initialValues: form }, ({ values, handleChange, setFieldValue, isSubmitting }) => (React.createElement(formik_1.Form, null,
            React.createElement("div", null,
                React.createElement(core_1.H4, { className: "mt-4" }, "General"),
                React.createElement("p", { className: "mb-4" }, "Site specific settings"),
                React.createElement(core_1.FormGroup, { label: "Auto tracked", helperText: "Enabling this saves identified auto tracked items directly to your watched list instead of a draft" },
                    React.createElement(core_1.Switch, { name: "general.autoConvert", label: "Automatically save eligible items", checked: values.general.autoConvert, onChange: handleChange }))),
            React.createElement("div", null,
                React.createElement(core_1.H4, { className: "mt-4" }, "Extension"),
                React.createElement("p", { className: "mb-4" }, "Controls the browser extension behavior"),
                React.createElement(core_1.FormGroup, { label: "Tracking", helperText: "Enabling this removes the watched popup after finishing a video and instead automatically saves the item as a draft" },
                    React.createElement(core_1.Switch, { name: "extension.autoTrack", label: "Automatically track finished videos", checked: values.extension.autoTrack, onChange: handleChange })),
                React.createElement(core_1.FormGroup, { label: "Minimum video length", helperText: "Specify minimum amount in seconds for videos to be registered as watched" },
                    React.createElement(core_1.NumericInput, { onValueChange: (value) => setFieldValue('extension.minLengthSeconds', value), value: values.extension.minLengthSeconds })),
                React.createElement(Blacklist_1.default, { list: values.extension.blacklist, updateList: (list) => setFieldValue('extension.blacklist', list), helperTextPrefix: React.createElement("p", null, "List of domains that are not tracked") })),
            React.createElement(core_1.Button, { type: "submit", loading: isSubmitting }, "Save")))))));
};
exports.default = Settings;
//# sourceMappingURL=Settings.js.map