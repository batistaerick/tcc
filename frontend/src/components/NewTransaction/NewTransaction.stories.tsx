import Provider from '@/components/Provider/Provider';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import NewTransaction, { NewTransactionProps } from './NewTransaction';

export default {
  title: 'Components/NewTransaction',
  component: NewTransaction,
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
  args: { id: '123' },
} as Meta<NewTransactionProps>;

export const Default: StoryObj<NewTransactionProps> = {};
