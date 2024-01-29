import DefaultBackground from '@/components/DefaultBackground';
import Header from '@/components/Header';
import Provider from '@/components/Provider';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

export default {
  title: 'Components/Header',
  component: Header,
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
