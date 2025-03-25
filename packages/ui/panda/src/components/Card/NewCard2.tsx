import { css, cx } from '_panda/css';
import { useRef, useState, useEffect } from 'react';
import { ANIMAL_CARD_IMAGE_BASE_URL, CARD_INFO } from './constants';

export function NewCard2() {
  return (
    <main className={mainStyle}>
      <h1 className={headingStyle}>Responsive Game Cards</h1>

      <div className={cardGridStyle}>
        {/* Default card with placeholder */}
        <GameCard title="Dessert Fox" percentage="10%" rating="A+" />

        {/* Different content */}
        <GameCard title="Ice Dragon" percentage="25%" rating="S" />

        {/* Another example */}
        <GameCard title="Fire Golem" percentage="75%" rating="B" />
      </div>

      {/* Responsive size demonstration */}
      <div className={responsiveDemoStyle}>
        <h2 className={subheadingStyle}>Responsive Sizing</h2>
        <div className={responsiveGridStyle}>
          <div className={fullWidthStyle}>
            <GameCard title="Small Card" percentage="5%" rating="C" />
          </div>
          <div className={largeCardContainerStyle}>
            <GameCard title="Large Card" percentage="90%" rating="S+" customCss={maxWidthFullStyle} />
          </div>
        </div>
      </div>
    </main>
  );
}

interface GameCardProps {
  title: string;
  percentage: string;
  rating?: string;
  imageUrl?: string;
  customCss?: any;
}

function GameCard({
  title = 'Dessert Fox',
  percentage = '10%',
  rating = 'A+',
  imageUrl = '/placeholder.svg?height=200&width=200',
  customCss = {},
}: GameCardProps) {
  const svgRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState({
    title: 16,
    percentage: 16,
    rating: 16,
  });

  // Adjust font size based on container width
  useEffect(() => {
    const updateFontSize = () => {
      if (svgRef.current) {
        const width = svgRef.current.clientWidth;
        setFontSize({
          title: Math.max(12, width * 0.08),
          percentage: Math.max(12, width * 0.08),
          rating: Math.max(12, width * 0.1),
        });
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const { bg, thumbnail } = CARD_INFO['A_PLUS'];

  return (
    <div className={cx(cardContainerStyle, customCss)}>
      <div ref={svgRef}>
        {/* Card background */}
        <img src={ANIMAL_CARD_IMAGE_BASE_URL + bg} alt={props.tier} width={220} height={272} draggable={false} />

        {/* <defs>
          <linearGradient id="cardBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#e6b800" />
          </linearGradient>
        </defs> */}

        {/* Main card border */}
        <path
          d="M10,0 L230,0 L240,10 L240,270 L230,280 L10,280 L0,270 L0,10 Z"
          fill="url(#cardBorder)"
          stroke="#d4af37"
          strokeWidth="2"
        />

        {/* Inner card area (blue background) */}
        <rect x="20" y="20" width="200" height="200" fill="#1a237e" />

        {/* Rating badge background */}
        <path
          d="M180,0 L230,0 L240,10 L240,50 L220,70 L180,70 L170,60 L170,10 Z"
          fill="#ffd700"
          stroke="#d4af37"
          strokeWidth="1"
        />
      </div>

      {/* Image container */}
      <div className={imageContainerStyle}>
        <div className={imageWrapperStyle}>
          <img src={imageUrl || '/placeholder.svg'} alt={title} style={{ objectFit: 'contain' }} />
        </div>
      </div>

      {/* Text elements positioned absolutely over the SVG */}
      <div className={titleStyle} style={{ fontSize: `${fontSize.title}px` }}>
        {title}
      </div>

      <div className={percentageStyle} style={{ fontSize: `${fontSize.percentage}px` }}>
        {percentage}
      </div>

      <div className={ratingStyle} style={{ fontSize: `${fontSize.rating}px` }}>
        {rating}
      </div>
    </div>
  );
}

// NewCard2 Component Styles
const mainStyle = css({
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  gap: '2rem',
});

const headingStyle = css({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
});

const cardGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '64rem',
  '@media (min-width: 640px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

const responsiveDemoStyle = css({
  width: '100%',
  maxWidth: '64rem',
  marginTop: '2rem',
});

const subheadingStyle = css({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
});

const responsiveGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '1.5rem',
  '@media (min-width: 640px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

const fullWidthStyle = css({
  width: '100%',
});

const largeCardContainerStyle = css({
  width: '100%',
  '@media (min-width: 640px)': {
    gridColumn: 'span 2',
  },
});

const maxWidthFullStyle = css({
  maxWidth: '100%',
});

// GameCard Component Styles
const cardContainerStyle = css({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  maxWidth: '300px',
});

const imageContainerStyle = css({
  position: 'absolute',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '20px',
  left: '20px',
  right: '20px',
  width: 'calc(100% - 40px)',
  height: 'calc(100% - 120px)',
});

const imageWrapperStyle = css({
  position: 'relative',
  width: '75%',
  height: '75%',
});

const titleStyle = css({
  position: 'absolute',
  bottom: '0',
  left: '0',
  padding: '1rem',
  fontWeight: 'bold',
  color: '#000000',
});

const percentageStyle = css({
  position: 'absolute',
  bottom: '0',
  right: '0',
  padding: '1rem',
  fontWeight: 'bold',
  color: '#000000',
});

const ratingStyle = css({
  position: 'absolute',
  top: '0',
  right: '0',
  padding: '0.5rem',
  fontWeight: 'bold',
  color: '#000000',
  zIndex: 10,
});
