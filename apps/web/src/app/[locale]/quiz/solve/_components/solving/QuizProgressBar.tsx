import { css } from '_panda/css';

interface QuizProgressBarProps {
  progress: number;
}

const QuizProgressBar = ({ progress }: QuizProgressBarProps) => {
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
  transition: 'width 0.3s ease-in-out',
});
