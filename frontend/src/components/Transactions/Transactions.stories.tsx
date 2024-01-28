import Provider from '@/components/Provider/Provider';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import Transactions from './Transactions';

export default {
  title: 'Components/Transactions',
  component: Transactions,
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
