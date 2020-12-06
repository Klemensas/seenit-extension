"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLog = exports.getSettings = void 0;
const storage_1 = require("./common/storage");
const graphql_1 = require("./graphql");
const apollo_1 = require("./apollo");
const helpers_1 = require("./utils/helpers");
const syncInterval = 300000; // 5mins
function getUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield apollo_1.apolloClient.query({
            query: graphql_1.MeDocument,
            fetchPolicy: 'network-only',
        });
        return data.me;
    });
}
exports.getSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    const { user, lastUserSync } = yield storage_1.getStorageValue('user', 'lastUserSync');
    const nextSync = lastUserSync + syncInterval - Date.now();
    if (nextSync > 0)
        return user === null || user === void 0 ? void 0 : user.settings;
    const newUser = yield getUserData();
    const syncTime = Date.now();
    yield storage_1.updateStorage({ user: newUser, lastUserSync: syncTime });
    return newUser.settings;
});
function debugLog(...data) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: ADd debugging setting and check setttings. Is it really effective to fetch from storage every time?
        if (helpers_1.isProduction)
            return;
        // eslint-disable-next-line no-console
        console.log(data);
    });
}
exports.debugLog = debugLog;
//# sourceMappingURL=main.js.map