import Provider from '@/components/Provider';
import Transactions from '@/components/Transactions';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

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
