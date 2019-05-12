import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Popup from './Popup';
import { MemoryRouter } from 'react-router';

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql'
});
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
  ReactDOM.render(
    <MemoryRouter>
      <ApolloProvider client={apolloClient}>
        <Popup />
      </ApolloProvider>
    </MemoryRouter>,
    document.getElementById('popup'),
  );
});
