import Provider from '@/components/Provider/Provider';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import Balance from './Balance';

export default {
  title: 'Components/Balance',
  component: Balance,
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
