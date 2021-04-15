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
  console.log('ohohoho', settings, videoData);

  if (!settings) return;

  let container = document.getElementById('seenit-container');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'seenit-container');
  }

  const targetElement = document.fullscreenElement || document.body;
  targetElement.appendChild(container);
  setContainer(container);

  let targetRoute = ['/'];

  if (settings.extension.autoTrack) {
    targetRoute = ['/auto-tracked'];
    // const autoTrackedMutation = await apolloClient.mutate<AddAutoTrackedMutation>({
    //   mutation: AddAutoTrackedDocument,
    //   variables: {
    //     createdAt: Date.now(),
    //     meta: {
    //       title: videoData.title?.name,
    //       tvData:
    //         videoData.title?.season || videoData.title?.episode
    //           ? {
    //               season: videoData.title.season,
    //               episode: videoData.title.episode,
    //             }
    //           : null,
    //       url: window.location.href,
    //       provider: 'extension',
    //     },
    //   },
    // });

    // if (autoTrackedMutation.errors) {
    //   // TODO: handle errors
    //   Toaster.create(
    //     {
    //       position: 'top-right',
    //     },
    //     container,
    //   ).show({
    //     intent: 'danger',
    //     message: (
    //       <div className="text-ellipsis">
    //         <span>⚠ tracking failed</span>
    //       </div>
    //     ),
    //     // TODO: add retrying and display error
    //     action: {
    //       text: 'Retry',
    //     },
    //   });
    // } else if (autoTrackedMutation?.data?.addAutoTracked) {
    //   const autoTrackedData = autoTrackedMutation.data.addAutoTracked;
    //   const autoTrackedItem = autoTrackedData.item;
    //   const tvData = autoTrackedData.tvItem;

    //   if (!autoTrackedItem) {
    //     Toaster.create(
    //       {
    //         position: 'top-right',
    //       },
    //       container,
    //     ).show({
    //       intent: 'warning',
    //       message: (
    //         <div className="text-ellipsis">
    //           <span>❓ couldn't identify tracked item</span>
    //         </div>
    //       ),
    //       // TODO: add editing functionality. How about undoing/publishing?
    //       action: {
    //         text: 'Edit',
    //       },
    //     });
    //     return;
    //   }

    //   const name = 'name' in autoTrackedItem ? autoTrackedItem.name : autoTrackedItem.title;

    //   let tvMeta = '';
    //   if (tvData) {
    //     tvMeta =
    //       'episode_number' in tvData
    //         ? `S${tvData.season.season_number}E${tvData.episode_number}`
    //         : `S${tvData.season_number}`;
    //   }

    //   Toaster.create(
    //     {
    //       position: 'top-right',
    //     },
    //     container,
    //   ).show({
    //     intent: 'success',
    //     message: (
    //       <div className="text-ellipsis">
    //         <span>👏 tracked </span>
    //         <strong>
    //           {tvMeta && <span>{tvMeta} </span>}
    //           <span>{name}</span>
    //         </strong>
    //       </div>
    //     ),
    //     // TODO: add editing functionality. How about undoing/publishing?
    //     action: {
    //       text: 'Edit',
    //     },
    //   });
    // }

    // return;
  }

  ReactDOM.render(
    <MemoryRouter initialEntries={targetRoute} initialIndex={0}>
      <ApolloProvider client={apolloClient}>
        <Content videoData={videoData} />
      </ApolloProvider>
    </MemoryRouter>,
    container,
  );
};

// getSettings().then(() => {
//   let container = document.getElementById('seenit-container');
//   container = document.createElement('div');
//   container.setAttribute('class', 'popup-container');
//   container.setAttribute('id', 'seenit-container');
//   const targetElement = document.fullscreenElement || document.body;
//   targetElement.appendChild(container);

//   console.log('render me!');
//   ReactDOM.render(
//     <MemoryRouter initialEntries={['/']} initialIndex={0}>
//       <ApolloProvider client={apolloClient}>
//         <Content videoData={{} as any} />
//       </ApolloProvider>
//     </MemoryRouter>,
//     container,
//   );
// });

console.log('see?', process.env.TRACK_ON_PAUSE);

export default new RenderService(render);
