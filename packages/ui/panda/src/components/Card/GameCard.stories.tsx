import type { Meta, StoryObj } from '@storybook/react';
import { GameCard } from './GameCard';
import { css } from '_panda/css';

const meta: Meta<typeof GameCard> = {
  title: 'Components/GameCard',
  component: GameCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof GameCard>;

export const GameCardDefault: Story = {
  args: {
    title: 'QUOKKA',
    percentage: '10%',
    tier: 'A_PLUS',
    size: 'medium',
    imageUrl: 'https://static.gitanimals.org/personas/QUOKKA',
  },
};

export const AllCards = () => {
  return (
    <main className={mainStyle}>
      <h1 className={headingStyle}>Responsive Game Cards</h1>

      <div className={cardGridStyle}>
        <GameCard
          title="QUOKKA"
          percentage="10%"
          tier="A_PLUS"
          size="medium"
          imageUrl={'https://static.gitanimals.org/personas/QUOKKA'}
        />

        <GameCard
          title="Ice Dragon"
          percentage="25%"
          tier="S_PLUS"
          size="medium"
          imageUrl={'https://static.gitanimals.org/personas/QUOKKA'}
        />

        <GameCard
          title="Fire Golem"
          percentage="75%"
          tier="B_MINUS"
          size="medium"
          imageUrl={'https://static.gitanimals.org/personas/QUOKKA'}
        />
      </div>

      <div className={responsiveDemoStyle}>
        <h2 className={subheadingStyle}>Responsive Sizing</h2>
        <div className={responsiveGridStyle}>
          <div className={fullWidthStyle}>
            <GameCard
              title="Small Card"
              percentage="5%"
              tier="A_PLUS"
              size="small"
              imageUrl={'https://static.gitanimals.org/personas/QUOKKA'}
            />
          </div>
          <div className={largeCardContainerStyle}>
            <GameCard
              title="Large Card"
              percentage="90%"
              tier="S_PLUS"
              size="large"
              imageUrl={'https://static.gitanimals.org/personas/QUOKKA'}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

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
