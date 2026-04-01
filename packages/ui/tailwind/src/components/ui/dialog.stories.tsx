import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog';
import { Button } from './button';

const meta: Meta<typeof DialogContent> = {
  title: 'UI/Dialog',
  component: DialogContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'large', 'screen'],
      description: 'Dialog size variant',
    },
    isShowClose: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="m">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a dialog description. It provides additional context about the dialog content.
        </DialogDescription>
        <Button variant="primary" size="m">
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  ),
  args: {
    size: 'default',
    isShowClose: true,
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="m">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogTitle>No Close Button</DialogTitle>
        <DialogDescription>
          This dialog does not have a close button in the corner.
        </DialogDescription>
        <Button variant="primary" size="m">
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  ),
  args: {
    size: 'default',
    isShowClose: false,
  },
};

export const Large: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="m">Open Large Dialog</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>Large Dialog</DialogTitle>
          <DialogDescription>
            This is a large dialog that takes up more screen space.
            It&apos;s useful for displaying more complex content or forms.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-white/70">
            Large dialogs are great for:
          </p>
          <ul className="list-disc list-inside text-white/70 mt-2">
            <li>Complex forms</li>
            <li>Detailed information</li>
            <li>Multi-step processes</li>
            <li>Preview content</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="secondary" size="m">Cancel</Button>
          <Button variant="primary" size="m">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    size: 'large',
    isShowClose: true,
  },
};

export const CompoundComponent: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="secondary" size="m">Compound Pattern</Button>
      </Dialog.Trigger>
      <Dialog.Content size="default">
        <Dialog.Title>Compound Component Pattern</Dialog.Title>
        <Dialog.Description>
          The Dialog component supports a compound component pattern using dot notation.
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="primary" size="s">Close</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="m">Delete Item</Button>
      </DialogTrigger>
      <DialogContent size="default">
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogDescription>
        <div className="flex gap-3 w-full">
          <Dialog.Close asChild>
            <Button variant="secondary" size="m" className="flex-1">
              Cancel
            </Button>
          </Dialog.Close>
          <Button variant="primary" size="m" className="flex-1">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  ),
};
