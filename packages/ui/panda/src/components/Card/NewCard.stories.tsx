import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './NewCard';
import { useState, useRef, useEffect } from 'react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <CardWrapper>
        <Story />
      </CardWrapper>
    ),
  ],
};

function CardWrapper({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });

      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div ref={ref} style={{ border: '5px solid red' }}>
        {children}
      </div>

      <p>width: {size.width}px</p>
      <p>height: {size.height}px</p>
    </div>
  );
}

export default meta;
type Story = StoryObj<typeof Card>;

export const ExCard: Story = {
  args: {
    tier: 'EX',
    type: 'RABBIT',
    dropRate: '0.01%',
    personaImage: `https://static.gitanimals.org/personas/RABBIT`,
  },
};

export const SPlusCard: Story = {
  args: {
    tier: 'S_PLUS',
    type: 'RABBIT',
    dropRate: '0.1%',
    personaImage: `https://static.gitanimals.org/personas/RABBIT`,
  },
};

export const APlusCard: Story = {
  args: {
    tier: 'A_PLUS',
    type: 'RABBIT',
    dropRate: '1%',
    personaImage: `https://static.gitanimals.org/personas/RABBIT`,
  },
};

export const BMinusCard: Story = {
  args: {
    tier: 'B_MINUS',
    type: 'RABBIT',
    dropRate: '5%',
    personaImage: `https://static.gitanimals.org/personas/RABBIT`,
  },
};

// 크기 변형 예시 (small 사이즈)
export const SmallCard: Story = {
  args: {
    tier: 'EX',
    type: 'RABBIT',
    dropRate: '0.01%',
    personaImage: `https://static.gitanimals.org/personas/RABBIT`,
  },
  render: (args) => (
    <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
      <Card {...args} />
    </div>
  ),
};
