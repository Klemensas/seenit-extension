import * as React from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {
  duration: number;
  onStart: () => void;
  onRest: () => void;
}

const ProgressBar = ({ duration, onStart, onRest }: Props) => {
  const props = useSpring({ value: 0, from: { value: 100 }, config: { duration }, onRest, onStart });

  return (
    <div className="bp3-progress-bar bp3-progress-bar--custom bp3-intent-success bp3-no-stripes">
      <animated.div className="bp3-progress-meter" style={{ width: props.value.interpolate(v => v + '%') }} />
    </div>
  );
};

ProgressBar.defaultProps = {
  onStart: () => {},
};

export default ProgressBar;
