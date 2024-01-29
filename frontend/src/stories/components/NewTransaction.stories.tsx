import NewTransaction, {
  NewTransactionProps,
} from '@/components/NewTransaction';
import Provider from '@/components/Provider';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

export default {
  title: 'Components/NewTransaction',
  component: NewTransaction,
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
