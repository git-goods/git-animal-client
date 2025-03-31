import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', backgroundColor: '#2C2929', width: '400px', color: 'white' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>마우스를 올려보세요</TooltipTrigger>
        <TooltipContent>이것은 툴팁입니다</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>마우스를 올려보세요</TooltipTrigger>
        <TooltipContent>이것은 긴 내용을 가진 툴팁입니다. 여러 줄의 텍스트를 포함할 수 있습니다.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const WithCustomPosition: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>마우스를 올려보세요</TooltipTrigger>
        <TooltipContent side="right" align="center">
          오른쪽에 표시되는 툴팁입니다
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const WithNoDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>마우스를 올려보세요</TooltipTrigger>
        <TooltipContent>지연 시간이 없는 툴팁입니다 (0ms)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
