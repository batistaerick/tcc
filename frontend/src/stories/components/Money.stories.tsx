import Money, { MoneyProps } from '@/components/Money';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Money',
  component: Money,
  args: {
    className: 'text-red-900 text-xl',
    value: 5000,
  },
} as Meta<MoneyProps>;

export const Default: StoryObj<MoneyProps> = {};
