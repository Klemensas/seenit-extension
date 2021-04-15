import * as React from 'react';
import { AnchorButton, Button, Intent } from '@blueprintjs/core';

import { editTrackedRoute } from '../common/site';
import { useRemoveAutoTrackedMutation } from '../graphql';

import { CardNotification } from './TrackResult';

export default function TrackedUnidentified({ trackedId }: { trackedId: string }) {
  const [removeAutoTracked, removeAutoTrackedResponse] = useRemoveAutoTrackedMutation({
    variables: { ids: [trackedId] },
  });

  return (
    <CardNotification
      intent="warning"
      title={removeAutoTrackedResponse?.data ? '👋 Removed tracked item' : "😕 couldn't identify tracked item"}
      body={
        !removeAutoTrackedResponse?.data && (
          <div className="flex flex-between">
            <AnchorButton
              small
              minimal
              icon="edit"
              disabled={removeAutoTrackedResponse?.loading}
              target="_blank"
              href={editTrackedRoute(trackedId)}
            >
              Edit
            </AnchorButton>
            <Button
              small
              minimal
              intent={Intent.DANGER}
              loading={removeAutoTrackedResponse?.loading}
              icon="trash"
              onClick={() => removeAutoTracked()}
            >
              Remove
            </Button>
          </div>
        )
      }
    />
  );
}
