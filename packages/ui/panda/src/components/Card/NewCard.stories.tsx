import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './NewCard';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const ExCard: Story = {
  args: {
    tier: 'EX',
    type: 'SUMI_MA',
    dropRate: '0.01%',
    personaImage: 'https://via.placeholder.com/233x233?text=Persona',
  },
};

export const SPlusCard: Story = {
  args: {
    tier: 'S_PLUS',
    type: 'TIGER_KING',
    dropRate: '0.1%',
    personaImage: 'https://via.placeholder.com/233x233?text=Persona',
  },
};

export const APlusCard: Story = {
  args: {
    tier: 'A_PLUS',
    type: 'PANDA_MASTER',
    dropRate: '1%',
    personaImage: 'https://via.placeholder.com/233x233?text=Persona',
  },
};

export const BMinusCard: Story = {
  args: {
    tier: 'B_MINUS',
    type: 'RABBIT_ROOKIE',
    dropRate: '5%',
    personaImage: 'https://via.placeholder.com/233x233?text=Persona',
  },
};

// 크기 변형 예시 (small 사이즈)
export const SmallCard: Story = {
  args: {
    tier: 'EX',
    type: 'SUMI_MA',
    dropRate: '0.01%',
    personaImage: 'https://via.placeholder.com/233x233?text=Persona',
  },
  render: (args) => (
    <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
      <Card {...args} />
    </div>
  ),
};
