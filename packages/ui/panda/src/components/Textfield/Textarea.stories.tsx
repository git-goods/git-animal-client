import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './Textarea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <div style={{ padding: '20px', backgroundColor: '#2C2929', width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    defaultValue: '입력된 텍스트입니다.\n여러 줄의 텍스트를 입력할 수 있습니다.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    disabled: true,
  },
};
