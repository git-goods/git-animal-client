import type { Meta, StoryObj } from '@storybook/react';
import { Button, AnchorButton } from './Button';

// 메타데이터 정의
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost', 'link'],
      description: '버튼 변형 스타일',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: '버튼 크기',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'success', 'warning'],
      description: '버튼 색상 스키마',
    },
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

// 버튼 크기 스토리
export const 크기: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="s">아주 작게</Button>
      <Button size="m">작게</Button>
      <Button size="l">중간</Button>
    </div>
  ),
};

// 버튼 변형 스토리
export const 변형: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Solid</Button>
      <Button variant="secondary">Outline</Button>
    </div>
  ),
};

// 색상 스키마 스토리
export const 색상: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button colorScheme="primary">기본</Button>
      <Button colorScheme="secondary">보조</Button>
      <Button colorScheme="error">오류</Button>
      <Button colorScheme="success">성공</Button>
      <Button colorScheme="warning">경고</Button>
    </div>
  ),
};

// 비활성화 버튼 스토리
export const 비활성화: Story = {
  args: {
    children: '비활성화 버튼',
    disabled: true,
  },
};

// 앵커 버튼 스토리
export const 링크버튼: Story = {
  render: () => (
    <AnchorButton href="https://example.com" target="_blank">
      링크 버튼
    </AnchorButton>
  ),
};

// 사용자 정의 스타일 버튼
export const 커스텀스타일: Story = {
  args: {
    children: '커스텀 버튼',
    style: {
      background: 'linear-gradient(45deg, #ff8a00, #e52e71)',
      border: 'none',
      color: 'white',
      fontWeight: 'bold',
    },
  },
};
