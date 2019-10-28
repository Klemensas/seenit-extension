import * as React from 'react';

export default function CloseContent() {
  return (
    <button
      type="button"
      style={{
        position: 'absolute',
        right: '-0.5em',
        top: '-0.5em',
        width: '1em',
        height: '1em',
        background: 'red',
        color: 'white',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: '0',
        border: '0',
        cursor: 'pointer',
      }}
      onClick={() => {
        const container = document.getElementById('seenit-popup-container');
        container.parentNode.removeChild(container);
      }}
    >
      &times;
    </button>
  );
}
