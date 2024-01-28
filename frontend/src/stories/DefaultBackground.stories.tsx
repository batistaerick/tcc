import DefaultBackground, {
  DefaultBackgroundProps,
} from '@/components/DefaultBackground';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/DefaultBackground',
  args: { children: <div></div> },
  component: DefaultBackground,
} as Meta<DefaultBackgroundProps>;

export const Default: StoryObj<DefaultBackgroundProps> = {};
