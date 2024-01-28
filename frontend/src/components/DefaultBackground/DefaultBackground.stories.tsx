import { Meta, StoryObj } from '@storybook/react';
import DefaultBackground, { DefaultBackgroundProps } from './DefaultBackground';

export default {
  title: 'Components/DefaultBackground',
  args: { children: <div></div> },
  component: DefaultBackground,
} as Meta<DefaultBackgroundProps>;

export const Default: StoryObj<DefaultBackgroundProps> = {};
