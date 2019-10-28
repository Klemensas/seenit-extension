import * as React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';

import { apolloClient } from '../apollo';
import { settingPromise, settings } from '../main';
import Content from './Content';
import RenderService, { VideoData } from './renderService';

const render = async (videoData: VideoData) => {
  await settingPromise;
  if (!settings.popup) {
    return;
  }

  let container = document.getElementById('seenit-popup-container');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'seenit-popup-container');
    document.body.appendChild(container);
  }

  ReactDOM.render(
    <MemoryRouter>
      <ApolloProvider client={apolloClient}>
        <Content videoData={videoData} />
      </ApolloProvider>
    </MemoryRouter>,
    container,
  );
};

export default new RenderService(render);