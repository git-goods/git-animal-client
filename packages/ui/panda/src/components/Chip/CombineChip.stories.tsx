import type { Meta, StoryObj } from '@storybook/react';
import { CombineChip } from './CombineChip';

const meta: Meta<typeof CombineChip> = {
  title: 'Components/CombineChip',
  component: CombineChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', backgroundColor: '#2C2929', width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CombineChip>;

export const Default: Story = {
  render: () => (
    <CombineChip>
      <CombineChip.Trigger size="medium">
        <CombineChip.Value placeholder="옵션을 선택하세요" />
      </CombineChip.Trigger>
      <CombineChip.Content>
        <CombineChip.Group>
          <CombineChip.Label>옵션</CombineChip.Label>
          <CombineChip.Item value="option1">옵션 1</CombineChip.Item>
          <CombineChip.Item value="option2">옵션 2</CombineChip.Item>
          <CombineChip.Item value="option3">옵션 3</CombineChip.Item>
        </CombineChip.Group>
      </CombineChip.Content>
    </CombineChip>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <CombineChip>
      <CombineChip.Trigger size="small">
        <CombineChip.Value placeholder="옵션을 선택하세요" />
      </CombineChip.Trigger>
      <CombineChip.Content>
        <CombineChip.Group>
          <CombineChip.Label>옵션</CombineChip.Label>
          <CombineChip.Item value="option1">옵션 1</CombineChip.Item>
          <CombineChip.Item value="option2">옵션 2</CombineChip.Item>
        </CombineChip.Group>
      </CombineChip.Content>
    </CombineChip>
  ),
};
