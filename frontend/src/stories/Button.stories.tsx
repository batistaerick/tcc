import Button, { ButtonProps } from '@/components/Button';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  args: { translation: 'Save' },
  argTypes: { onClick: { action: 'clicked' } },
} as Meta<ButtonProps>;

export const Default: StoryObj<ButtonProps> = { args: { type: 'button' } };
export const Reset: StoryObj<ButtonProps> = { args: { type: 'reset' } };
export const Submit: StoryObj<ButtonProps> = { args: { type: 'submit' } };
