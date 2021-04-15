import * as React from 'react';
import { AnchorButton, Button, Intent } from '@blueprintjs/core';

import { EditableWatchedFragment, useRemoveWatchedMutation } from '../graphql';
import { CardNotification } from './TrackResult';
import { editWatchedRoute } from '../common/site';

export default function AutoPublished({ watched }: { watched: EditableWatchedFragment }) {
  const [removeWatched, { loading, data, called, error }] = useRemoveWatchedMutation({
    variables: { itemId: watched.id },
  });
  const { item, tvItem } = watched;

  const name = 'name' in item ? item.name : item.title;

  let tvMeta = '';
  if (tvItem) {
    tvMeta =
      'episode_number' in tvItem
        ? `S${tvItem.season.season_number}E${tvItem.episode_number}`
        : `S${tvItem.season_number}`;
  }

  if (error) {
    return (
      <CardNotification
        intent="danger"
        title="😳 sorry, removing failed"
        body={
          <div className="bp3-text-muted">
            <p>Please try removing the item on the website.</p>
            <p>Notify us if the issue reoccurs.</p>
          </div>
        }
      />
    );
  }

  return (
    <>
      <CardNotification
        intent="success"
        title={
          data ? (
            '👋 Removed tracked item'
          ) : (
            <>
              🙌 published
              <strong>
                {' '}
                {tvMeta && <span>{tvMeta} </span>}
                <span>{name}</span>
              </strong>
            </>
          )
        }
        body={
          !data && (
            <div className={`flex flex-${called ? 'end' : 'between'}`}>
              {!called && (
                <AnchorButton small minimal icon="edit" target="_blank" href={editWatchedRoute(watched.id)}>
                  Edit
                </AnchorButton>
              )}
              <Button
                small
                minimal
                intent={Intent.DANGER}
                loading={loading}
                icon="trash"
                onClick={() => removeWatched()}
              >
                Remove
              </Button>
            </div>
          )
        }
        loading={loading}
      />
    </>
  );
}
