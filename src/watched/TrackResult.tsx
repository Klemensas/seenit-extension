import { Button, Card, Elevation } from '@blueprintjs/core';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { VideoContext } from '../content/Content';

import {
  useAddAutoTrackedMutation,
  useSettingsQuery,
  useConvertAutoTrackedMutation,
  AutoTrackedDocument,
} from '../graphql';
import { closeContent } from '../utils/close';

interface CardNotificationProps {
  type: 'warning' | 'danger' | 'success';
  title: React.ReactNode;
  body?: React.ReactNode;
}

// DO: create dedicated layouts so popup-container can be refactored, add action handling for editing

function CardNotification({ type, title, body }: CardNotificationProps) {
  return (
    <Card elevation={Elevation.TWO} className={`card-intent-${type}`}>
      <div className="flex flex-between flex-align-items-center">
        <div className="bp3-text-large text-ellipsis">{title}</div>
        <Button icon="cross" minimal small onClick={closeContent} />
      </div>

      {body && <div className="pt-2">{body}</div>}
    </Card>
  );
}

export default function TrackResult() {
  const videoData = React.useContext(VideoContext);
  const history = useHistory();

  const settingsQuery = useSettingsQuery();
  const [addAutoTrackedMutation, addAutoTrackedResult] = useAddAutoTrackedMutation();
  const [convertAutoTracked, convertAutoTrackedResult] = useConvertAutoTrackedMutation();

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

        cache.writeQuery({
          query: AutoTrackedDocument,
          variables: { id: data.addAutoTracked.id },
          data: {
            autoTracked: data.addAutoTracked,
          },
        });
      },
    });
  }, [addAutoTrackedMutation, videoData]);

  // TODO: do actual handling scenarios
  const error = settingsQuery.error || addAutoTrackedResult.error || convertAutoTrackedResult.error;
  if (error) {
    return (
      <CardNotification
        type="danger"
        title="😳 sorry, auto tracking failed"
        body={
          <div className="bp3-text-muted">
            <p>Please try tracking manually until we fix this.</p>
            <p>Notify us if the issue isn't fixed in a couple of days.</p>
            <Button small minimal onClick={() => history.push('/match-auto-tracked')}>
              Edit
            </Button>
          </div>
        }
      />
    );
  }

  // TODO: data check conditions are required to appease TS, maybe it can be simplified or variabalized?
  const hiddenLoader = settingsQuery.loading || addAutoTrackedResult.loading;
  if (hiddenLoader || !addAutoTrackedResult.data || !settingsQuery.data) return null;

  const autoTrackedData = addAutoTrackedResult.data.addAutoTracked;
  const autoTrackedItem = autoTrackedData.item;
  const tvData = autoTrackedData.tvItem;

  if (!autoTrackedItem) {
    return (
      <CardNotification
        type="warning"
        title="😕 couldn't identify tracked item"
        body={
          <Link to={`/edit-auto-tracked/${autoTrackedData.id}`}>
            <Button small minimal>
              Edit
            </Button>
          </Link>
        }
      />
    );
  }

  const { autoConvert } = settingsQuery.data.settings.general;
  const name = 'name' in autoTrackedItem ? autoTrackedItem.name : autoTrackedItem.title;

  let tvMeta = '';
  if (tvData) {
    tvMeta =
      'episode_number' in tvData
        ? `S${tvData.season.season_number}E${tvData.episode_number}`
        : `S${tvData.season_number}`;
  }

  const isConverted = !!convertAutoTrackedResult.data;
  const message = autoConvert || isConverted ? '🙌 saved' : '👏 tracked as draft';

  // TODO: add editing of identified items?
  return (
    <CardNotification
      type="success"
      title={
        <>
          {message}
          <strong>
            {' '}
            {tvMeta && <span>{tvMeta} </span>}
            <span>{name}</span>
          </strong>
        </>
      }
      body={
        !autoConvert &&
        !isConverted && (
          <Button
            small
            minimal
            loading={convertAutoTrackedResult.loading}
            onClick={() => convertAutoTracked({ variables: { ids: [autoTrackedItem.id] } })}
          >
            Save
          </Button>
        )
      }
    />
  );
}
