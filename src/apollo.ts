import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';

import { getStorageValue, updateStorage } from './common/storage';
import introspectionQueryResultData from './graphql/fragments';
import { debugLog } from './main';
import { resolvers, typeDefs } from './resolvers';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});
export const cache = new InMemoryCache({ fragmentMatcher });

getStorageValue<{ token?: string; user?: object }>('token', 'user').then(({ token, user }) => {
  cache.writeData({
    data: {
      isLoggedIn: !!token,
      userData: user || null,
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
          cache.writeData({
            data: {
              isLoggedIn: false,
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
  typeDefs,
});
