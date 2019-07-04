import { Resolvers } from 'apollo-client';
import gql from 'graphql-tag';

import { updateStorage } from './browserService';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    setIsLoggedIn: (root, { isLoggedIn }, { cache }) => {
      updateStorage({ token: null });
      cache.writeData({ data: { isLoggedIn } });
      return isLoggedIn;
    },
  },
};

export const isLoggedIn = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
