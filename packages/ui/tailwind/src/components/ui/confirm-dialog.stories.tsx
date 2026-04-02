import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ConfirmDialog } from './confirm-dialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'UI/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
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
    description: 'This will merge two pets into one. The original pets will be lost.',
    confirmText: 'Yes, merge',
    cancelText: 'No, keep them',
  },
};

export const Loading: Story = {
  args: {
    title: 'Save Changes?',
    description: 'Click confirm to simulate a loading state.',
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
    children: <div className="rounded-md bg-white/10 p-3 text-sm text-white/70">Pet: Golden Retriever (Lv.5)</div>,
  },
};
