import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function DialogLayout({ children }: Props) {
  return <div className="notification-layout">{children}</div>;
}
