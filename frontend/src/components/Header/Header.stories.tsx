import DefaultBackground from '@/components/DefaultBackground/DefaultBackground';
import Provider from '@/components/Provider/Provider';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Provider>
            <DefaultBackground>{Story()}</DefaultBackground>
          </Provider>
        </RecoilRoot>
      );
    },
  ],
} as Meta;

export const Default: StoryObj = {};
