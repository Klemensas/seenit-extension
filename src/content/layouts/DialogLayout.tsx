import * as React from 'react';

import CloseContent from '../CloseContent';

interface Props {
  children: React.ReactNode;
}

export default function DialogLayout({ children }: Props) {
  return (
    <div className="dialog-layout">
      <CloseContent />

      {children}
    </div>
  );
}
