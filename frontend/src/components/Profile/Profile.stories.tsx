import Provider from '@/components/Provider/Provider';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import Profile from './Profile';

export default {
  title: 'Components/Profile',
  component: Profile,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Provider>{Story()}</Provider>
        </RecoilRoot>
      );
    },
  ],
} as Meta;

export const Default: StoryObj = {};
