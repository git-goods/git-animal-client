import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './textfield';

const meta: Meta<typeof TextField> = {
  title: 'UI/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message',
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
  args: {
    placeholder: 'Enter text...',
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello World',
    placeholder: 'Enter text...',
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter text...',
    error: 'This field is required',
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div>
        <label className="block text-white/70 mb-2 font-product text-glyph-14">
          Username
        </label>
        <TextField placeholder="Enter username" />
      </div>
      <div>
        <label className="block text-white/70 mb-2 font-product text-glyph-14">
          Email
        </label>
        <TextField placeholder="Enter email" type="email" />
      </div>
      <div>
        <label className="block text-white/70 mb-2 font-product text-glyph-14">
          Password
        </label>
        <TextField
          placeholder="Enter password"
          type="password"
          error="Password must be at least 8 characters"
        />
      </div>
    </div>
  ),
};
