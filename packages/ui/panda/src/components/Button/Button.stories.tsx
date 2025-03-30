import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// 메타데이터 정의
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼 스토리
export const 기본: Story = {
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'm',
    colorScheme: 'primary',
  },
};
