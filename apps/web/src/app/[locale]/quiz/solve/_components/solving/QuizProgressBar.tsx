import { useEffect } from 'react';
import { useState } from 'react';
import { css } from '_panda/css';

interface Props {
  startedAt: Date;
  timeoutAt: Date;
  onTimeout: () => void;
}

const QuizProgressBar = ({ startedAt, timeoutAt, onTimeout }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      if (currentTime.getTime() >= timeoutAt.getTime()) {
        onTimeout();
        return clearInterval(interval);
      }

      const startTime = new Date(startedAt);
      const progress = (currentTime.getTime() - startTime.getTime()) / (timeoutAt.getTime() - startTime.getTime());
      setProgress(progress);
    }, 1000);

    return () => clearInterval(interval);
  }, [progress, startedAt, timeoutAt, onTimeout]);

  return (
    <div className={progressBarStyle}>
      <div className={progressBarFillStyle} style={{ width: `${progress}%` }} />
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
  transition: 'width 1s ease-in-out',
});
