"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.resolvers = exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
const storage_1 = require("./common/storage");
exports.typeDefs = graphql_tag_1.default `
  extend type Query {
    isLoggedIn: Boolean!
  }
`;
exports.resolvers = {
    Mutation: {
        logout: (root, variables, { cache }) => {
            storage_1.updateStorage({ token: null, user: null });
            cache.writeData({ data: { isLoggedIn: false, userData: null } });
            return true;
        },
    },
};
exports.isLoggedIn = graphql_tag_1.default `
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
//# sourceMappingURL=resolvers.js.map