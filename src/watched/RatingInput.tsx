import * as React from 'react';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import ReactRating from 'react-rating';

export default function RatingInput({
  value,
  onChange,
  className = '',
}: {
  value: number;
  onChange: ReactRating['props']['onChange'];
  className?: string;
}) {
  return (
    <ReactRating
      onChange={onChange}
      className={className}
      initialRating={value}
      fractions={2}
      fullSymbol={<Icon icon={IconNames.STAR} color="gold" iconSize={Icon.SIZE_LARGE} />}
      emptySymbol={<Icon icon={IconNames.STAR_EMPTY} color="gold" iconSize={Icon.SIZE_LARGE} />}
    />
  );
}
