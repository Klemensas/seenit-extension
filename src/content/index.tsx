import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { MemoryRouter } from 'react-router';

import { apolloClient } from '../apollo';
import Content from './Content';
import RenderService, { VideoData } from './renderService';
import { settingPromise, settings } from '../main';

const render = async (videoData: VideoData) => {
  await settingPromise;
  if (!settings.popup) { return; }

  let container = document.getElementById('screen-popup-container');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'screen-popup-container');
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
}

export let renderService = new RenderService(render);
