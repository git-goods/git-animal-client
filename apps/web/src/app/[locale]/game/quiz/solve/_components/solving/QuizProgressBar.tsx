import { useEffect, useMemo, useState } from 'react';
import { dayjs } from '@gitanimals/dayjs';
import { cn } from '@gitanimals/ui-tailwind';

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
    <div className="h-[4px] w-full overflow-hidden rounded-[4px] bg-white-25">
      <div
        className={cn(
          'h-full rounded-[4px] bg-white [transition:width_0.1s_linear,background-color_0.1s_linear]',
          warning && 'bg-red-500 [animation:pulse_1s_infinite]',
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default QuizProgressBar;
