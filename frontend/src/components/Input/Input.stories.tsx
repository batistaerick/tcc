import { Meta, StoryObj } from '@storybook/react';
import Input, { InputProps } from './Input';

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
