import { Resolvers } from 'apollo-client';
import gql from 'graphql-tag';

import { updateStorage } from './common/storage';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    logout: (root, variables, { cache }) => {
      updateStorage({ token: null, user: null });
      cache.writeData({ data: { isLoggedIn: false, userData: null } });

      return true;
    },
  },
  // Query: {
  //   isLoggedIn() {
  //     console.log('query');
  //     return getStorageValue('token').then(({ token }) => {
  //       console.log('sasa', JSON.stringify(token))
  //       return !!token;
  //     }).then((d) => {
  //       console.log('huh', d)
  //       return d;
  //     })
  //   }
  // }
};

export const isLoggedIn = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
