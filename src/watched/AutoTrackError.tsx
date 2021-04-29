import * as React from 'react';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import { CardNotification } from './CardNotification';

export default function AutoTrackError() {
  return (
    <CardNotification intent="danger" title="😳 sorry, auto tracking failed">
      <div className="bp3-text-muted">
        <p>Please try tracking manually until we fix this.</p>
        <p>Notify us if the issue isn't fixed in a couple of days.</p>
        <Link to="/">
          <Button small minimal>
            Edit
          </Button>
        </Link>
      </div>
    </CardNotification>
  );
}
