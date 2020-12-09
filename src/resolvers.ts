import { Resolvers, gql, ApolloCache } from '@apollo/client';

import { updateStorage } from './common/storage';

export const resolvers: Resolvers = {
  Mutation: {
    logout: (root, variables, { cache }: { cache: ApolloCache<unknown> }) => {
      updateStorage({ token: null, user: null });
      cache.writeQuery({
        query: gql`
          {
            userData
          }
        `,
        data: {
          userData: null,
        },
      });

      return true;
    },
  },
};
