import { Button } from '@repo/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AxeIcon } from 'lucide-react';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    importance: {
      description: 'The importance of the button',
      control: 'radio',
      options: ['primary', 'secondary'] as const,
    },
    shape: {
      description: 'The shape of the button',
      control: 'radio',
      options: ['regular', 'icon'] as const,
    },
    onClick: {
      description: 'The onClick handler',
      action: 'clicked',
    },
    children: {
      description: 'The button content - can be any valid React node',
    },
    disabled: {
      description: 'Whether the button is clickable or not',
      control: 'radio',
      options: [true, false] as const,
    },
  },
  args: {
    importance: 'primary',
    shape: 'regular',
    children: 'Button',
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  args: {
    importance: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    importance: 'secondary',
    children: 'Secondary',
  },
};

export const Icon: Story = {
  args: {
    importance: 'secondary',
    shape: 'icon',
    children: <AxeIcon aria-label="Axe" />,
  },
};
