import { css, cva, cx } from '_panda/css';
import { useRef, useState, useEffect } from 'react';
import { ANIMAL_CARD_IMAGE_BASE_URL, CARD_INFO, CardTierType } from './constants';

export function NewCard2() {
  return (
    <main className={mainStyle}>
      <h1 className={headingStyle}>Responsive Game Cards</h1>

      <div className={cardGridStyle}>
        {/* Default card with placeholder */}
        <GameCard title="Dessert Fox" percentage="10%" tier="A_PLUS" size="medium" />

        {/* Different content */}
        <GameCard title="Ice Dragon" percentage="25%" tier="S_PLUS" size="medium" />

        {/* Another example */}
        <GameCard title="Fire Golem" percentage="75%" tier="B_MINUS" size="medium" />
      </div>

      {/* Responsive size demonstration */}
      <div className={responsiveDemoStyle}>
        <h2 className={subheadingStyle}>Responsive Sizing</h2>
        <div className={responsiveGridStyle}>
          <div className={fullWidthStyle}>
            <GameCard title="Small Card" percentage="5%" tier="A_PLUS" size="small" />
          </div>
          <div className={largeCardContainerStyle}>
            <GameCard title="Large Card" percentage="90%" tier="S_PLUS" size="large" />
          </div>
        </div>
      </div>
    </main>
  );
}

interface GameCardProps {
  // title: string;
  // percentage: string;
  // rating?: string;
  // imageUrl?: string;
  // customCss?: any;
  tier: CardTierType;
  title?: string;
  percentage?: string;
  size?: 'small' | 'medium' | 'large';
}

function GameCard({ title = 'Dessert Fox', percentage = '10%', tier = 'A_PLUS', size = 'medium' }: GameCardProps) {
  const svgRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState({
    title: 16,
    percentage: 16,
    rating: 16,
  });
  const [positions, setPositions] = useState({
    titlePadding: '1rem',
    percentagePadding: '1rem',
  });

  // Adjust font size based on container width
  useEffect(() => {
    const updateSizes = () => {
      if (svgRef.current) {
        const width = svgRef.current.clientWidth;

        // 150px(small 사이즈)일 때 정확히 12px이 되도록 계산
        setFontSize({
          title: width * 0.08, // 150px * 0.08 = 12px
          percentage: width * 0.08, // 150px * 0.08 = 12px
          rating: width * 0.1, // 150px * 0.1 = 15px
        });

        // 카드 크기에 따라 패딩 동적 조정
        setPositions({
          titlePadding: `${Math.max(8, width * 0.05)}px`,
          percentagePadding: `${Math.max(8, width * 0.05)}px`,
        });
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  const { bg, thumbnail } = CARD_INFO[tier];

  return (
    <div className={cardCva({ size })}>
      <div ref={svgRef}>
        {/* Card background */}
        <img
          src={ANIMAL_CARD_IMAGE_BASE_URL + bg}
          alt={'A_PLUS'}
          width={220}
          height={272}
          draggable={false}
          className={bgImageStyle}
        />
      </div>

      {/* Image container */}
      <div className={imageContainerStyle}>
        <div className={imageWrapperStyle}>
          <img src={ANIMAL_CARD_IMAGE_BASE_URL + thumbnail} alt={title} style={{ objectFit: 'contain' }} />
        </div>
      </div>

      {/* Text elements positioned absolutely over the SVG */}
      <div
        className={titleStyle}
        style={{
          fontSize: `${fontSize.title}px`,
          padding: positions.titlePadding,
        }}
      >
        {title}
      </div>

      <div
        className={percentageStyle}
        style={{
          fontSize: `${fontSize.percentage}px`,
          padding: positions.percentagePadding,
        }}
      >
        {percentage}
      </div>
    </div>
  );
}

const bgImageStyle = css({
  width: '100%',
  height: '100%',
});

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
  top: '0',
  left: '0',
  right: '0',
  width: '100%',
  aspectRatio: '1/1',
});

const imageWrapperStyle = css({
  position: 'relative',
  width: '90%',
  aspectRatio: '1/1',
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

const cardCva = cva({
  base: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    maxWidth: '300px',
    border: '5px solid red',
    aspectRatio: '220/272',
  },
  variants: {
    size: {
      small: {
        maxWidth: '150px',
      },
      medium: {
        maxWidth: '200px',
      },
      large: {
        maxWidth: '300px',
      },
    },
  },
});
