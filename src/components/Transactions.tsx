'use client';
import useMonthlyTransaction from '@/hooks/useMonthlyTransaction';
import { Expense, Income } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { KeyedMutator } from 'swr';
import FinancialMovements from './FinancialMovements';

type hookType = {
  data: { incomes: Income[]; expenses: Expense[] };
  mutate: KeyedMutator<any>;
};

export default function Transactions() {
  const { t } = useTranslation();
  const { data, mutate }: hookType = useMonthlyTransaction();

  return (
    <div>
      <div className="mx-5 font-semibold text-indigo-600">
        {t('transactions:expenses')}
      </div>
      <div className="h-52 overflow-y-auto">
        {data?.expenses?.map((expense) => (
          <FinancialMovements
            key={expense.id}
            id={expense.id}
            category={expense.category}
            amount={expense.amount}
            type="expenses"
            mutateOnDelete={mutate}
          />
        ))}
      </div>
      <div className="mx-5 font-semibold text-indigo-600">
        {t('transactions:incomes')}
      </div>
      <div className="h-52 overflow-y-auto">
        {data?.incomes?.map((income) => (
          <FinancialMovements
            key={income.id}
            id={income.id}
            category={income.category}
            amount={income.amount}
            type="incomes"
            mutateOnDelete={mutate}
          />
        ))}
      </div>
    </div>
  );
}
