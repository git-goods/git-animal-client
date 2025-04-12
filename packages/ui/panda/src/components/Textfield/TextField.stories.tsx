import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    defaultValue: '입력된 텍스트',
  },
};

export const WithError: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    error: '올바른 텍스트를 입력해주세요',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    disabled: true,
  },
};
