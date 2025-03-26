import { css, cx } from '_panda/css';

interface PowerButtonProps {
  isPowered: boolean;
  onClick: () => void;
}

export default function PowerButton({ isPowered, onClick }: PowerButtonProps) {
  return (
    <div className={cx(containerStyle, isPowered ? poweredStateStyle : unpoweredStateStyle)} onClick={onClick}>
      <div className={innerCircleStyle}>
        <div className={iconContainerStyle}>
          <div className={verticalLineContainerStyle}>
            <div className={verticalLineStyle} />
          </div>
          <div className={horizontalLineContainerStyle}>
            <div className={horizontalLineStyle} />
          </div>
          {isPowered && (
            <div className={centerDotContainerStyle}>
              <div className={centerDotStyle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Power Button Styles
const containerStyle = css({
  width: '3rem',
  height: '3rem',
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 300ms',
});

const poweredStateStyle = css({
  backgroundColor: '#dc2626', // bg-red-600
  '&:hover': {
    backgroundColor: '#b91c1c', // bg-red-700
  },
});

const unpoweredStateStyle = css({
  backgroundColor: '#16a34a', // bg-green-600
  '&:hover': {
    backgroundColor: '#15803d', // bg-green-700
  },
});

const innerCircleStyle = css({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '9999px',
  borderWidth: '2px',
  borderColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const iconContainerStyle = css({
  width: '1.5rem',
  height: '1.5rem',
  position: 'relative',
});

const verticalLineContainerStyle = css({
  position: 'absolute',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const verticalLineStyle = css({
  width: '0.25rem',
  height: '1.5rem',
  backgroundColor: '#ffffff',
  borderRadius: '9999px',
});

const horizontalLineContainerStyle = css({
  position: 'absolute',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const horizontalLineStyle = css({
  width: '1.5rem',
  height: '0.25rem',
  backgroundColor: '#ffffff',
  borderRadius: '9999px',
});

const centerDotContainerStyle = css({
  position: 'absolute',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const centerDotStyle = css({
  width: '0.75rem',
  height: '0.75rem',
  backgroundColor: '#ffffff',
  borderRadius: '9999px',
});
