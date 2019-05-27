import gql from 'graphql-tag';
import { Resolvers } from 'apollo-client';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    setIsLoggedIn: (root, { isLoggedIn }, { cache }) => {
      chrome.storage.sync.set({ token: null });
      cache.writeData({ data: { isLoggedIn }});
      return isLoggedIn;
    }
  }
};

export const isLoggedIn = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
