"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloClient = exports.cache = void 0;
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_client_1 = require("apollo-client");
const apollo_link_1 = require("apollo-link");
const apollo_link_context_1 = require("apollo-link-context");
const apollo_link_error_1 = require("apollo-link-error");
const apollo_link_http_1 = require("apollo-link-http");
const storage_1 = require("./common/storage");
const fragments_1 = require("./graphql/fragments");
const main_1 = require("./main");
const resolvers_1 = require("./resolvers");
const fragmentMatcher = new apollo_cache_inmemory_1.IntrospectionFragmentMatcher({
    introspectionQueryResultData: fragments_1.default,
});
exports.cache = new apollo_cache_inmemory_1.InMemoryCache({ fragmentMatcher });
storage_1.getStorageValue('token', 'user').then(({ token, user }) => {
    exports.cache.writeData({
        data: {
            isLoggedIn: !!token,
            userData: user || null,
        },
    });
});
const httpLink = apollo_link_http_1.createHttpLink({
    uri: `${process.env.SERVER_API}/graphql`,
});
const authLink = apollo_link_context_1.setContext((request, { headers }) => storage_1.getStorageValue('token').then(({ token }) => ({
    headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token}` : '' }),
})));
const errorLink = apollo_link_error_1.onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach((err) => {
            var _a;
            switch ((_a = err.extensions) === null || _a === void 0 ? void 0 : _a.code) {
                case 'UNAUTHENTICATED':
                    exports.cache.writeData({
                        data: {
                            isLoggedIn: false,
                            userData: null,
                        },
                    });
                    storage_1.updateStorage({ token: null, user: null });
                    main_1.debugLog('unauthenticated');
                    return;
                default:
                    main_1.debugLog('uhh interesting error', err);
            }
        });
    }
});
exports.apolloClient = new apollo_client_1.default({
    cache: exports.cache,
    resolvers: resolvers_1.resolvers,
    connectToDevTools: true,
    link: apollo_link_1.ApolloLink.from([errorLink, authLink, httpLink]),
    typeDefs: resolvers_1.typeDefs,
});
//# sourceMappingURL=apollo.js.map