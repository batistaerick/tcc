'use client';
import useMonthlyTransactions from '@/hooks/useMonthlyTransactions';
import { Expense, Income } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { KeyedMutator } from 'swr';
import FinancialMovements from './FinancialMovements';

interface HookType {
  data: { incomes: Income[]; expenses: Expense[] };
  mutate: KeyedMutator<any>;
}

export default function Transactions() {
  const { t } = useTranslation();
  const { data, mutate }: HookType = useMonthlyTransactions();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[350px] rounded-xl bg-slate-800 md:w-[700px]">
        <div className="flex items-center justify-center font-semibold text-rose-500">
          {t('transactions:expenses')}
        </div>
        <div className="h-60 overflow-y-auto">
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
      </div>
      <div className="w-[350px] rounded-xl bg-slate-800 md:w-[700px]">
        <div className="flex items-center justify-center font-semibold text-green-400">
          {t('transactions:incomes')}
        </div>
        <div className="h-60 overflow-y-auto">
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
    </div>
  );
}
