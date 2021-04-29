import * as React from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {
  duration: number;
  pause?: boolean;
  intent?: 'success' | 'warning' | 'danger' | 'primary';
  onStart?: () => void;
  onRest: () => void;
  className?: string;
}

const ProgressBar = ({ duration, intent = 'primary', pause, className, onStart, onRest }: Props) => {
  const [reset, setReset] = React.useState(false);
  React.useEffect(() => {
    if (!pause) setReset(true);
  }, [pause]);

  const { value } = useSpring({
    pause,
    value: 0,
    from: { value: 100 },
    config: { duration },
    reset,
    onRest: ({ finished }) => finished && onRest(),
    // onStart: () => setReset(false) && onStart?.(),
  });

  return (
    <div className={`bp3-progress-bar bp3-progress-bar--custom bp3-intent-${intent} bp3-no-stripes ${className}`}>
      <animated.div className="bp3-progress-meter" style={{ width: value.to((v) => `${v}%`) }} />
    </div>
  );
};

export default ProgressBar;
