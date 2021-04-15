import { Button, Card, Elevation, Intent } from '@blueprintjs/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { updateUserSettings } from '../common/apollo/helpers';
import ProgressBar from '../components/ProgressBar';
import { UserContext, VideoContext } from '../content/Content';

import {
  useAddAutoTrackedMutation,
  useConvertAutoTrackedMutation,
  AutoTrackedDocument,
  useUpdateSettingsMutation,
} from '../graphql';
import { closeContent } from '../utils/helpers';

interface CardNotificationProps {
  intent: 'success' | 'warning' | 'danger';
  title: React.ReactNode;
  body?: React.ReactNode;
  loading?: boolean;
  hideAfter?: number;
}

export function CardNotification({ intent, title, body, loading, hideAfter = 8000 }: CardNotificationProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Card
      elevation={Elevation.TWO}
      className={`card-notification card-intent-${intent}`}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <div className="flex flex-between flex-align-items-center">
        <div className="bp3-text-large text-ellipsis pr-2">{title}</div>
        <Button icon="cross" minimal small onClick={closeContent} />
      </div>

      {body && <div className="pt-2">{body}</div>}
      {!loading && hideAfter && (
        <ProgressBar
          duration={hideAfter}
          intent={intent}
          pause={isFocused}
          onRest={closeContent}
          className="card-progressbar"
        />
      )}
    </Card>
  );
}

export default function TrackResult() {
  const videoData = React.useContext(VideoContext);
  const user = React.useContext(UserContext);

  const [addAutoTrackedMutation, addAutoTrackedResult] = useAddAutoTrackedMutation();
  const [convertAutoTracked, convertAutoTrackedResult] = useConvertAutoTrackedMutation();
  const [updateSettings, updateSettingsResult] = useUpdateSettingsMutation({
    update: (cache, { data }) => {
      if (!data || !user) return;

      updateUserSettings(cache, {
        ...user,
        settings: data.updateSettings,
      });
    },
  });

  React.useEffect(() => {
    addAutoTrackedMutation({
      variables: {
        createdAt: Date.now(),
        meta: {
          title: videoData?.title?.name || '&nbsp;',
          tvData:
            videoData?.title?.season || videoData?.title?.episode
              ? {
                  season: videoData.title.season,
                  episode: videoData.title.episode,
                }
              : null,
          url: window.location.href,
          provider: 'extension',
        },
      },
      // TODO: explicitly set query result to avoid unecessary query on redirect
      // Maybe this can be avoided?
      update: (cache, { data }) => {
        if (!data) return;

        console.log('update trigr');
        cache.writeQuery({
          query: AutoTrackedDocument,
          variables: { id: data.autoTracked.id },
          data: {
            autoTracked: data.autoTracked,
          },
        });
        console.log('update woopdie doo');
      },
    });
  }, [addAutoTrackedMutation, videoData]);

  // TODO: do actual handling scenarios
  const error = addAutoTrackedResult.error || convertAutoTrackedResult.error;
  if (error) {
    return (
      <CardNotification
        intent="danger"
        title="😳 sorry, auto tracking failed"
        body={
          <div className="bp3-text-muted">
            <p>Please try tracking manually until we fix this.</p>
            <p>Notify us if the issue isn't fixed in a couple of days.</p>
            <Link to="/">
              <Button small minimal>
                Edit
              </Button>
            </Link>
          </div>
        }
      />
    );
  }

  // TODO: data check conditions are required to appease TS, maybe it can be simplified or variabalized?
  const hiddenLoader = addAutoTrackedResult.loading;
  if (hiddenLoader || !addAutoTrackedResult.data || !user) return null;

  return 'wat';

  // const { settings } = user;
  // const autoTrackedData = addAutoTrackedResult.data.addAutoTracked;
  // const autoTrackedItem = autoTrackedData.item;
  // const tvData = autoTrackedData.tvItem;

  // if (!autoTrackedItem) {
  //   return (
  //     <CardNotification
  //       type="warning"
  //       title="😕 couldn't identify tracked item"
  //       body={
  //         <Link to={`/edit-auto-tracked/${autoTrackedData.id}`}>
  //           <Button small minimal>
  //             Edit
  //           </Button>
  //         </Link>
  //       }
  //     />
  //   );
  // }

  // const { autoConvert } = settings.general;
  // const name = 'name' in autoTrackedItem ? autoTrackedItem.name : autoTrackedItem.title;

  // let tvMeta = '';
  // if (tvData) {
  //   tvMeta =
  //     'episode_number' in tvData
  //       ? `S${tvData.season.season_number}E${tvData.episode_number}`
  //       : `S${tvData.season_number}`;
  // }

  // const isConverted = !!convertAutoTrackedResult.data;
  // let message = '';
  // if (updateSettingsResult.data) {
  //   message = '👌 new tracked items will be published';
  // } else if (autoConvert || isConverted) {
  //   message = '🙌 saved';
  // } else {
  //   message = '👏 tracked as draft';
  // }

  // // TODO: add editing of identified items?
  // return (
  //   <CardNotification
  //     type="success"
  //     title={
  //       <>
  //         {message}
  //         {!updateSettingsResult.data && !isConverted && (
  //           <strong>
  //             {' '}
  //             {tvMeta && <span>{tvMeta} </span>}
  //             <span>{name}</span>
  //           </strong>
  //         )}
  //       </>
  //     }
  //     body={
  //       (isConverted && !updateSettingsResult.data && (
  //         <Button
  //           small
  //           minimal
  //           loading={updateSettingsResult.loading}
  //           onClick={() => {
  //             // We're storing full cache data with metadata like __typename, which isn't a supported filed in the mutation
  //             // Manually stripping this, could be automated via link if this  is more prevalent
  //             const { __typename, ...extension } = settings.extension;
  //             const { __typename: generalTypename, ...general } = settings.general;
  //             updateSettings({ variables: { extension, general: { ...general, autoConvert: true } } });
  //           }}
  //         >
  //           Always publish auto tracked items
  //         </Button>
  //       )) ||
  //       (!autoConvert && !updateSettingsResult.data && (
  //         <Button
  //           small
  //           minimal
  //           loading={convertAutoTrackedResult.loading}
  //           onClick={() => {
  //             convertAutoTracked({ variables: { ids: [autoTrackedItem.id] } });
  //           }}
  //         >
  //           Publish
  //         </Button>
  //       ))
  //     }
  //   />
  // );
}
