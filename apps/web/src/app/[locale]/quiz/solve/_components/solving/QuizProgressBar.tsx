import { useEffect, useMemo, useState } from 'react';
import { css, cx } from '_panda/css';
import { dayjs } from '@gitanimals/dayjs';

interface QuizProgressBarProps {
  onTimeout: () => void;
  timeoutAt: string;
  paused?: boolean;
}

const INTERVAL = 100;
const WARNING_THRESHOLD = 80;

const QuizProgressBar = ({ onTimeout, timeoutAt, paused }: QuizProgressBarProps) => {
  const [warning, setWarning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startTime = useMemo(() => dayjs(), [timeoutAt]);
  const endTime = useMemo(() => dayjs.tz(timeoutAt, 'UTC'), [timeoutAt]);
  const totalDuration = useMemo(() => endTime.diff(startTime, 'milliseconds'), [startTime, endTime]);

  useEffect(() => {
    const calculateProgress = () => {
      if (paused) return;

      const now = dayjs();
      const elapsedTime = now.diff(startTime, 'milliseconds');
      const newProgress = (elapsedTime / totalDuration) * 100;

      setProgress(Math.min(Math.max(newProgress, 0), 100));
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, INTERVAL);

    return () => clearInterval(interval);
  }, [startTime, totalDuration, paused]);

  useEffect(() => {
    if (progress === 100) {
      onTimeout();
      return;
    }

    if (progress > WARNING_THRESHOLD) {
      setWarning(true);
    }
  }, [progress, onTimeout]);

  return (
    <div className={progressBarStyle}>
      <div className={cx(progressBarFillStyle, warning && warningStyle)} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default QuizProgressBar;

const progressBarStyle = css({
  width: '100%',
  height: '4px',
  backgroundColor: 'white.white_25',
  borderRadius: '4px',
  overflow: 'hidden',
});

const progressBarFillStyle = css({
  height: '100%',
  backgroundColor: 'white',
  borderRadius: '4px',
  transition: 'width 0.1s linear, background-color 0.1s linear',
});

const warningStyle = css({
  backgroundColor: 'red.500',
  animation: 'pulse 1s infinite',
});
