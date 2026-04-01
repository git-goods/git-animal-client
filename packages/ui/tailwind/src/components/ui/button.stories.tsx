import type { Meta, StoryObj } from '@storybook/react';
import { Button, AnchorButton } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Button size',
    },
    floating: {
      control: 'boolean',
      description: 'Fixed floating button at bottom',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'm',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'm',
    children: 'Secondary Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 's',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'm',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'l',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'm',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: 'secondary',
    size: 'm',
    children: 'Disabled Secondary',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" size="s">Primary S</Button>
        <Button variant="primary" size="m">Primary M</Button>
        <Button variant="primary" size="l">Primary L</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="secondary" size="s">Secondary S</Button>
        <Button variant="secondary" size="m">Secondary M</Button>
        <Button variant="secondary" size="l">Secondary L</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" size="m" disabled>Disabled Primary</Button>
        <Button variant="secondary" size="m" disabled>Disabled Secondary</Button>
      </div>
    </div>
  ),
};

export const AsAnchor: StoryObj<typeof AnchorButton> = {
  render: () => (
    <AnchorButton
      variant="primary"
      size="m"
      href="https://github.com/git-goods/gitanimals"
      target="_blank"
    >
      Visit GitAnimals
    </AnchorButton>
  ),
};
