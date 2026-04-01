import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './select';

const meta: Meta<typeof SelectTrigger> = {
  title: 'UI/Select',
  component: SelectTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Trigger size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select defaultValue="apple">
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    size: 'default',
  },
};

export const Small: Story = {
  render: (args) => (
    <Select defaultValue="apple">
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    size: 'sm',
  },
};

export const WithPlaceholder: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    size: 'default',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Select defaultValue="apple">
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    disabled: true,
  },
};

export const WithGroups: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  args: {
    size: 'default',
  },
};

export const CompoundComponent: Story = {
  render: () => (
    <Select.Root defaultValue="react">
      <Select.Trigger>
        <Select.Value placeholder="Select framework" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Frontend</Select.Label>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="angular">Angular</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Backend</Select.Label>
          <Select.Item value="next">Next.js</Select.Item>
          <Select.Item value="remix">Remix</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  ),
};
