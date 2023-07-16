import type { Meta, StoryObj } from '@storybook/react';
import AddButton from '../components/AddButton';

const meta: Meta<typeof AddButton> = {
  title: 'AddButton',
  component: AddButton,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const Base: Story = {
  args: {
    primary: true,
    label: 'AddButton',
  },
};
