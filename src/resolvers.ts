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
