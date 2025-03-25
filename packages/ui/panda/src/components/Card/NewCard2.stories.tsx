import type { Meta, StoryObj } from '@storybook/react';
import { NewCard2 } from './NewCard2';
import { useState, useRef, useEffect } from 'react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card2',
  component: NewCard2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const NewCard22: Story = {
  args: {},
};
