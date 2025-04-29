import type { Meta, StoryObj } from '@storybook/react';
import SplitText from './SplitText';

const meta: Meta<typeof SplitText> = {
  title: 'Animation/SplitText',
  component: SplitText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    delay: { control: { type: 'number', min: 0, max: 500, step: 10 } },
    textAlign: {
      control: { type: 'radio' },
      options: ['left', 'center', 'right', 'justify'],
    },
    threshold: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    onLetterAnimationComplete: { action: 'animationComplete' },
  },
};

export default meta;
type Story = StoryObj<typeof SplitText>;

export const Default: Story = {
  args: {
    text: 'Hello, World!',
    delay: 100,
    textAlign: 'center',
    threshold: 0.1,
    rootMargin: '-10px',
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a longer text example to show how SplitText handles multiple words',
    delay: 50,
    textAlign: 'left',
  },
};

export const SlowAnimation: Story = {
  args: {
    text: 'Slow Animation',
    delay: 300,
    textAlign: 'center',
  },
};
