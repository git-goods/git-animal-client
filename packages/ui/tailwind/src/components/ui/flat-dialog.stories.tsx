import type { Meta, StoryObj } from '@storybook/react';
import { FlatDialog } from './flat-dialog';

const meta: Meta<typeof FlatDialog> = {
  title: 'UI/FlatDialog',
  component: FlatDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: () => {},
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
    isLoading: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Alert style (confirm only) ---

export const Alert: Story = {
  args: {
    title: 'Notice',
    description: 'Your pet has leveled up!',
    confirmText: 'OK',
    size: 'sm',
  },
};

// --- Confirm style ---

export const Confirm: Story = {
  args: {
    title: 'Delete Item?',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    size: 'sm',
  },
};

// --- MD with close button and children ---

export const MediumWithContent: Story = {
  args: {
    title: 'Transfer Pet',
    description: 'Select a user to transfer this pet to.',
    confirmText: 'Transfer',
    cancelText: 'Cancel',
    size: 'md',
    children: (
      <div className="space-y-2">
        <input
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 text-sm outline-none placeholder:text-white/40"
          placeholder="Search users..."
        />
        <ul className="space-y-1">
          {['user_alpha', 'user_beta', 'user_gamma'].map((user) => (
            <li
              key={user}
              className="bg-white/10 text-white rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-white/20"
            >
              {user}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
};

// --- LG with scrollable body ---

export const LargeScrollable: Story = {
  args: {
    title: 'Pet Collection',
    description: 'Browse your collected pets and their details.',
    confirmText: 'Close',
    size: 'lg',
    children: (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/20" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-white">Pet {i + 1}</span>
              <span className="text-xs text-white/70">Level {(i + 1) * 3}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

// --- Loading state ---

export const Loading: Story = {
  args: {
    title: 'Save Changes?',
    description: 'Click confirm to save your changes.',
    confirmText: 'Save',
    cancelText: 'Discard',
    isLoading: true,
  },
};

// --- Full size ---

export const FullSize: Story = {
  args: {
    title: 'Pet Gallery',
    description: 'View all available pets in the gallery.',
    confirmText: 'Done',
    size: 'full',
    children: (
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 16 }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 rounded-lg bg-white/10 p-3">
            <div className="h-12 w-12 rounded-full bg-white/20" />
            <span className="text-sm font-medium text-white">Pet {i + 1}</span>
          </div>
        ))}
      </div>
    ),
  },
};
