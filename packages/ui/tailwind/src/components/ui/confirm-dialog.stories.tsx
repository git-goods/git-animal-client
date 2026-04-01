import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmDialog } from './confirm-dialog';
import { Button } from './button';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'UI/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="primary" size="m" onClick={() => setIsOpen(true)}>
          Open ConfirmDialog
        </Button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        />
      </>
    );
  },
  args: {
    title: 'Delete Item?',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  },
};

export const CustomButtonText: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" size="m" onClick={() => setIsOpen(true)}>
          Open ConfirmDialog
        </Button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        />
      </>
    );
  },
  args: {
    title: 'Merge Pet?',
    description: 'This will merge two pets into one. The original pets will be lost.',
    confirmText: 'Yes, merge',
    cancelText: 'No, keep them',
  },
};

export const AsyncConfirm: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="primary" size="m" onClick={() => setIsOpen(true)}>
          Async Confirm
        </Button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: 'Save Changes?',
    description: 'Click confirm to simulate a 2-second async operation.',
    confirmText: 'Save',
    cancelText: 'Discard',
  },
};

export const WithChildren: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="primary" size="m" onClick={() => setIsOpen(true)}>
          With Custom Content
        </Button>
        <ConfirmDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        >
          <div className="rounded-md bg-white/10 p-3 text-sm text-white/70">
            Pet: Golden Retriever (Lv.5)
          </div>
        </ConfirmDialog>
      </>
    );
  },
  args: {
    title: 'Sell this pet?',
    description: 'The following pet will be sold:',
    confirmText: 'Sell',
    cancelText: 'Cancel',
  },
};
