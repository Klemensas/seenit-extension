"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSettings = void 0;
const storage_1 = require("../storage");
const graphql_1 = require("../../graphql");
exports.updateUserSettings = (cache, user) => {
    storage_1.updateStorage({ user });
    return cache.writeQuery({
        query: graphql_1.SettingsDocument,
        data: {
            settings: user.settings,
        },
    });
};
//# sourceMappingURL=helpers.js.map