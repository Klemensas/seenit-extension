import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';

import { apolloClient } from '../apollo';
import { settingPromise, settings } from '../main';
import Content from './Content';
import RenderService, { VideoData } from './renderService';
import { AddAutoTrackedDocument } from '../graphql';

const render = async (videoData: VideoData) => {
  await settingPromise;

  if (!settings.popup) {
    apolloClient.mutate({
      mutation: AddAutoTrackedDocument,
      variables: {
        createdAt: Date.now(),
        meta: {
          title: videoData.title.name,
          tvData:
            videoData.title.season || videoData.title.episode
              ? {
                  season: videoData.title.season,
                  episode: videoData.title.episode,
                }
              : null,
          url: window.location.href,
          provider: 'extension',
        },
      },
    });
    return;
  }

  let container = document.getElementById('seenit-container');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('class', 'popup-container');
    container.setAttribute('id', 'seenit-container');
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
