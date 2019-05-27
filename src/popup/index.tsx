import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { MemoryRouter } from 'react-router';

import Popup from './Popup';
import { apolloClient } from '../apollo';

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  ReactDOM.render(
    <MemoryRouter>
      <ApolloProvider client={apolloClient}>
        <Popup />
      </ApolloProvider>
    </MemoryRouter>,
    document.getElementById('popup'),
  );
});
