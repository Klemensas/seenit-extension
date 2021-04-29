import * as React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';

import { closeContent } from '../utils/helpers';
import ProgressBar from '../components/ProgressBar';

interface CardNotificationProps {
  intent?: 'primary' | 'success' | 'warning' | 'danger';
  title: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  hideAfter?: number | false;
  className?: string;
}

export function CardNotification({
  intent,
  title,
  children,
  loading,
  hideAfter = 8000,
  className,
}: CardNotificationProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const classNames = [
    'card-notification',
    intent && `card-intent-${intent}`,
    hideAfter && `card-notification--auto-hide`,
    className,
  ].filter(Boolean);
  return (
    <Card
      elevation={Elevation.TWO}
      className={classNames.join(' ')}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <div className="flex flex-content-between flex-items-center">
        <div className="bp3-text-large text-ellipsis pr-2">{title}</div>
        <Button icon="cross" minimal small onClick={closeContent} />
      </div>

      {children && <div className="pt-2">{children}</div>}
      {!loading && hideAfter && (
        <ProgressBar
          duration={hideAfter}
          intent={intent}
          pause={isFocused}
          onRest={closeContent}
          className="card-progressbar"
        />
      )}
    </Card>
  );
}
