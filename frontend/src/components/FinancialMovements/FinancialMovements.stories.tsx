import Provider from '@/components/Provider/Provider';
import { TransactionType } from '@/enums/enums';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import FinancialMovements, {
  FinancialMovementsProps,
} from './FinancialMovements';

export default {
  title: 'Components/FinancialMovements',
  component: FinancialMovements,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    transaction: {
      id: '1',
      user: {
        id: '1',
        name: 'Story',
        email: 'story@story.com',
        password: 'Story',
        refreshToken: 'Story',
        refreshTokenExpires: 1,
        accessToken: 'Story',
        accessTokenExpires: 1,
        roles: [],
        transactions: [],
        authorities: [],
      },
      category: 'Salary',
      notes: 'Monthly',
      date: new Date(),
      value: 1000,
      transactionType: TransactionType.FIXED_INCOME,
    },
    mutateOnDelete: () => Promise.resolve(null),
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
} as Meta<FinancialMovementsProps>;

export const Default: StoryObj<FinancialMovementsProps> = {};
