import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialogV2 } from './confirm-dialog-v2';

const meta: Meta<typeof ConfirmDialogV2> = {
  title: 'UI/ConfirmDialogV2',
  component: ConfirmDialogV2,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
    isLoading: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Delete Item?',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  },
};

export const CustomButtonText: Story = {
  args: {
    title: 'Merge Pet?',
    description: 'This will merge two pets into one stronger pet.',
    confirmText: 'Yes, merge',
    cancelText: 'No, keep them',
  },
};

export const Loading: Story = {
  args: {
    title: 'Save Changes?',
    description: 'Click confirm to save your changes.',
    confirmText: 'Save',
    cancelText: 'Discard',
    isLoading: true,
  },
};

export const WithChildren: Story = {
  args: {
    title: 'Sell this pet?',
    description: 'The following pet will be sold:',
    confirmText: 'Sell',
    cancelText: 'Cancel',
    children: (
      <div className="bg-white/10 text-white rounded-md p-3 text-sm">
        Pet: Golden Retriever (Lv.5)
      </div>
    ),
  },
};

export const MediumSize: Story = {
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
          <li className="bg-white/10 text-white rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-white/20">
            user_alpha
          </li>
          <li className="bg-white/10 text-white rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-white/20">
            user_beta
          </li>
          <li className="bg-white/10 text-white rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-white/20">
            user_gamma
          </li>
        </ul>
      </div>
    ),
  },
};
