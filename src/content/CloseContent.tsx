import * as React from 'react';
import { Button } from '@blueprintjs/core';

import { closeContent } from '../utils/helpers';

export default function CloseContent() {
  return (
    <Button
      className="close-content"
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
      }}
      icon="cross"
      minimal
      onClick={closeContent}
    />
  );
}
