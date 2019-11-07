import * as React from 'react';
import { Button } from '@blueprintjs/core';

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
      onClick={() => {
        const container = document.getElementById('seenit-container');
        container.parentNode.removeChild(container);
      }}
    />
  );
}
