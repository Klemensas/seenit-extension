import { AnchorButton, Button, Intent } from '@blueprintjs/core';
import * as React from 'react';

import { CardNotification } from './TrackResult';

import { useConvertAutoTrackedMutation, useRemoveAutoTrackedMutation } from '../graphql';
import { closeContent } from '../utils/helpers';
import { editTrackedRoute } from '../common/site';
import AutoPublished from './AutoPublished';

export default function AutoTracked({
  tvMeta,
  itemName,
  trackedId,
}: {
  tvMeta: string;
  itemName: string;
  trackedId: string;
}) {
  const [convertAutoTracked, convertAutoTrackedResponse] = useConvertAutoTrackedMutation();
  const [removeAutoTracked, removeAutoTrackedResponse] = useRemoveAutoTrackedMutation({
    variables: { ids: [trackedId] },
  });

  if (convertAutoTrackedResponse.data)
    return <AutoPublished watched={convertAutoTrackedResponse.data.convertAutoTracked.watched[0]} />;

  return (
    <CardNotification
      intent="success"
      title={
        removeAutoTrackedResponse?.data ? (
          '👋 Removed tracked item'
        ) : (
          <>
            👏 tracked as draft
            <strong>
              {' '}
              {tvMeta && <span>{tvMeta} </span>}
              <span>{itemName}</span>
            </strong>
          </>
        )
      }
      body={
        !removeAutoTrackedResponse?.data && (
          <div className="flex flex-between">
            <Button
              onClick={() => {
                convertAutoTracked({ variables: { ids: [trackedId] } });
              }}
              disabled={removeAutoTrackedResponse?.loading}
              loading={convertAutoTrackedResponse.loading}
              small
              minimal
            >
              Publish
            </Button>
            <AnchorButton
              href={editTrackedRoute(trackedId)}
              onClick={closeContent}
              disabled={removeAutoTrackedResponse?.loading || convertAutoTrackedResponse.loading}
              small
              minimal
              icon="edit"
              target="_blank"
            >
              Edit
            </AnchorButton>
            <Button
              onClick={() => removeAutoTracked()}
              disabled={convertAutoTrackedResponse?.loading}
              loading={removeAutoTrackedResponse?.loading}
              small
              minimal
              intent={Intent.DANGER}
              icon="trash"
            >
              Remove
            </Button>
          </div>
        )
      }
    />
  );
}
