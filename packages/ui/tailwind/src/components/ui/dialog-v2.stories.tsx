import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DialogV2 } from './dialog-v2';

const meta: Meta = {
  title: 'UI/DialogV2',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const noop = () => {};

export const SM: Story = {
  render: () => (
    <DialogV2 key="sm" open onOpenChange={noop} modal={false}>
      <DialogV2.Content size="sm">
        <DialogV2.Title>Delete Item?</DialogV2.Title>
        <DialogV2.Description>
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogV2.Description>
        <DialogV2.Footer>
          <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white">Cancel</button>
          <button className="rounded-md bg-brand-canary px-3 py-1.5 text-sm text-black">Delete</button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  ),
};

export const MD: Story = {
  render: () => (
    <DialogV2 key="md" open onOpenChange={noop} modal={false}>
      <DialogV2.Content size="md">
        <DialogV2.CloseButton />
        <DialogV2.Header>
          <DialogV2.Title>Edit Profile</DialogV2.Title>
          <DialogV2.Description>Update your display name and bio.</DialogV2.Description>
        </DialogV2.Header>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/70">Display Name</label>
            <input
              type="text"
              placeholder="Enter your display name"
              className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/70">Bio</label>
            <textarea
              placeholder="Tell us about yourself"
              rows={3}
              className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-white/30 resize-none"
            />
          </div>
        </div>
        <DialogV2.Footer>
          <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white">Cancel</button>
          <button className="rounded-md bg-brand-canary px-3 py-1.5 text-sm text-black">Save</button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  ),
};

export const LG: Story = {
  render: () => (
    <DialogV2 key="lg" open onOpenChange={noop} modal={false}>
      <DialogV2.Content size="lg">
        <DialogV2.CloseButton />
        <DialogV2.Header>
          <DialogV2.Title>Pet Collection</DialogV2.Title>
          <DialogV2.Description>Browse your collected pets and their details.</DialogV2.Description>
        </DialogV2.Header>
        <DialogV2.Body>
          <div className="grid grid-cols-2 max-mobile:grid-cols-1 gap-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/20" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-white">Pet {i + 1}</span>
                  <span className="text-xs text-white/70">Level {(i + 1) * 3}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogV2.Body>
        <DialogV2.Footer>
          <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white">Close</button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  ),
};

export const Full: Story = {
  render: () => (
    <DialogV2 key="full" open onOpenChange={noop} modal={false}>
      <DialogV2.Content size="full">
        <DialogV2.CloseButton />
        <DialogV2.Header>
          <DialogV2.Title>Pet Gallery</DialogV2.Title>
          <DialogV2.Description>View all available pets in the gallery.</DialogV2.Description>
        </DialogV2.Header>
        <DialogV2.Body>
          <div className="grid grid-cols-4 max-tablet:grid-cols-3 max-mobile:grid-cols-2 gap-3">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 rounded-lg bg-white/10 p-3">
                <div className="h-12 w-12 rounded-full bg-white/20" />
                <span className="text-sm font-medium text-white">Pet {i + 1}</span>
                <span className="text-xs text-white/70">Level {(i + 1) * 2}</span>
              </div>
            ))}
          </div>
        </DialogV2.Body>
        <DialogV2.Footer>
          <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white">Close</button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  ),
};
