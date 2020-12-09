import { ApolloClient, ApolloLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createHttpLink } from '@apollo/client/link/http';

import { getStorageValue, updateStorage } from './common/storage';
import introspectionQueryResultData from './graphql/introspection';
import { debugLog } from './main';
import { resolvers } from './resolvers';

export const cache = new InMemoryCache({ possibleTypes: introspectionQueryResultData.possibleTypes });

getStorageValue<{ token?: string; user?: object }>('token', 'user').then(({ token, user }) => {
  cache.writeQuery({
    query: gql`
      {
        userData
      }
    `,
    data: {
      userData: (token && user) || null,
    },
  });
});

const httpLink = createHttpLink({
  uri: `${process.env.SERVER_API}/graphql`,
});

const authLink = setContext((request, { headers }) =>
  getStorageValue<{ token: string }>('token').then(({ token }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  })),
);

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      switch (err.extensions?.code) {
        case 'UNAUTHENTICATED':
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
          updateStorage({ token: null, user: null });

          debugLog('unauthenticated');
          return;
        default:
          debugLog('uhh interesting error', err);
      }
    });
  }
});

export const apolloClient = new ApolloClient({
  cache,
  resolvers,
  connectToDevTools: true,
  link: ApolloLink.from([errorLink, authLink, httpLink]),
});
