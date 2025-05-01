import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger>
        <Select.Value placeholder="옵션을 선택하세요" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>옵션</Select.Label>
          <Select.Item value="option1">옵션 1</Select.Item>
          <Select.Item value="option2">옵션 2</Select.Item>
          <Select.Item value="option3">옵션 3</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <Select>
      <Select.Trigger>
        <Select.Value placeholder="옵션을 선택하세요" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>그룹 1</Select.Label>
          <Select.Item value="option1">옵션 1</Select.Item>
          <Select.Item value="option2">옵션 2</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>그룹 2</Select.Label>
          <Select.Item value="option3">옵션 3</Select.Item>
          <Select.Item value="option4">옵션 4</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  ),
};
