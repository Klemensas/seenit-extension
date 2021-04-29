import * as React from 'react';
import { AnchorButton, Button, Intent } from '@blueprintjs/core';

import { EditableWatchedFragment, useRemoveWatchedMutation } from '../graphql';
import { CardNotification } from './CardNotification';
import { editWatchedRoute } from '../common/site';
import { renderWatchedActionTitle } from '../utils/watched';

export default function AutoPublished({ watched }: { watched: EditableWatchedFragment }) {
  const [removeWatched, { loading, data, called, error }] = useRemoveWatchedMutation({
    variables: { itemId: watched.id },
  });

  if (error) {
    return (
      <CardNotification intent="danger" title="😳 sorry, removing failed">
        <div className="bp3-text-muted">
          <p>Please try removing the item on the website.</p>
          <p>Notify us if the issue reoccurs.</p>
        </div>
      </CardNotification>
    );
  }

  return (
    <>
      <CardNotification
        intent="success"
        loading={loading}
        title={
          data ? '👋 Removed tracked item' : renderWatchedActionTitle('🙌 published', watched.item, watched.tvItem)
        }
      >
        {!data && (
          <div className={`flex flex-content-${called ? 'flex-end' : 'between'}`}>
            {!called && (
              <AnchorButton small minimal icon="edit" target="_blank" href={editWatchedRoute(watched.id)}>
                Edit
              </AnchorButton>
            )}
            <Button small minimal intent={Intent.DANGER} loading={loading} icon="trash" onClick={() => removeWatched()}>
              Remove
            </Button>
          </div>
        )}
      </CardNotification>
    </>
  );
}
