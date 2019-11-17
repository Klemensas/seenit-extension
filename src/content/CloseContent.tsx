import * as React from 'react';
import { Button } from '@blueprintjs/core';

import { closeContent } from '../utils/close';

export default function CloseContent() {
  return (
    <Button
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
