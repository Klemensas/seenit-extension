import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';

import { apolloClient } from '../apollo';
import { getStorageSettings } from '../main';
import Content from './Content';
import RenderService, { VideoData } from './renderService';
import { setContainer } from '../utils/helpers';

const render = async (videoData: VideoData) => {
  const settings = await getStorageSettings();

  if (!settings) return;

  let container = document.getElementById('seenit-container');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'seenit-container');
  }

  // TODO: can this get called when the container is still present?
  const targetElement = document.fullscreenElement || document.body;
  targetElement.appendChild(container);
  setContainer(container);

  let targetRoute = ['/'];

  if (settings.extension.autoTrack) targetRoute = ['/auto-tracked'];

  ReactDOM.render(
    <MemoryRouter initialEntries={targetRoute} initialIndex={0}>
      <ApolloProvider client={apolloClient}>
        <Content videoData={videoData} />
      </ApolloProvider>
    </MemoryRouter>,
    container,
  );
};

export default new RenderService(render);
