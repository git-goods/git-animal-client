import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './scroll-area';

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[280px] rounded-xl border border-white/20 bg-gray-150 p-4">
      <div className="flex flex-col gap-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="rounded-md bg-white/10 px-3 py-2 text-glyph-14 text-white">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-[400px] rounded-xl border border-white/20 bg-gray-150 p-4">
      <div className="flex gap-3 w-max">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[120px] h-[80px] rounded-md bg-white/10 flex items-center justify-center text-glyph-14 text-white"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const LongText: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[320px] rounded-xl border border-white/20 bg-gray-150 p-4">
      <div className="text-glyph-14 text-white/70 space-y-3">
        <p>
          GitAnimals is a platform where users can raise virtual pets through their GitHub activity.
          Every contribution you make helps your pets grow and evolve.
        </p>
        <p>
          Pets gain experience from commits, pull requests, and code reviews. As they level up, they
          unlock new appearances and abilities.
        </p>
        <p>
          You can trade pets with other users through the marketplace, or merge pets together to
          create rare combinations.
        </p>
        <p>
          The guild system allows you to team up with other developers and participate in seasonal
          events for exclusive rewards.
        </p>
        <p>
          Keep your contribution streak alive to earn bonus points and unlock special evolution paths
          for your favorite pets.
        </p>
      </div>
    </ScrollArea>
  ),
};
