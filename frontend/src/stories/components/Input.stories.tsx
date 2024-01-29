import Input, { InputProps } from '@/components/Input';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    id: 'input-id',
    value: '',
    label: 'Label',
    onChange: () => {},
  },
} as Meta<InputProps>;

export const Text: StoryObj<InputProps> = { args: { type: 'text' } };
export const Password: StoryObj<InputProps> = { args: { type: 'password' } };
