import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';

import { getStorageValue } from './browserService';
import introspectionQueryResultData from './graphql/fragments';
import { debugLog } from './main';
import { resolvers, typeDefs } from './resolvers';

const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });
export const cache = new InMemoryCache({ fragmentMatcher });

getStorageValue('token', 'user').then(({ token, user }) => {
  cache.writeData({ data: {
    isLoggedIn: !!token,
    userData: user || null,
  }});
});

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
});

const authLink = setContext((request, { headers }) =>
  getStorageValue('token').then(({ token }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }),
));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          cache.writeData({ data: {
            isLoggedIn: false,
            userData: null,
          } });
          chrome.storage.sync.set({ token: null });
        default:
          debugLog('uhh interesting error', err);
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  cache,
  resolvers,
  connectToDevTools: true,
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  typeDefs,
});
