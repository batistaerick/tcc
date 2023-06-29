'use client';
import useMonthlyExpenses from '@/hooks/useMonthlyExpenses';
import useMonthlyIncomes from '@/hooks/useMonthlyIncomes';
import { Expense, Income } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { KeyedMutator } from 'swr';
import FinancialMovements from './FinancialMovements';

export default function Transactions() {
  const { t } = useTranslation();
  const {
    data: expenses,
    mutate: expenseMutate,
  }: { data: Expense[]; mutate: KeyedMutator<any> } = useMonthlyExpenses();
  const {
    data: incomes,
    mutate: incomeMutate,
  }: { data: Income[]; mutate: KeyedMutator<any> } = useMonthlyIncomes();

  return (
    <div>
      <div className="mx-5 flex justify-between">
        <div className="font-semibold text-indigo-600">
          {t('transactions:expenses')}
        </div>
        <button className="font-semibold text-indigo-600">
          {t('transactions:viewAll')}
        </button>
      </div>
      <div className="h-52 overflow-y-auto">
        {expenses?.map((expense) => (
          <FinancialMovements
            key={expense.id}
            id={expense.id}
            category={expense.category}
            amount={expense.amount}
            type="expenses"
            mutateOnDelete={expenseMutate}
          />
        ))}
      </div>
      <div className="mx-5 flex justify-between">
        <div className="font-semibold text-indigo-600">
          {t('transactions:incomes')}
        </div>
        <button className="font-semibold text-indigo-600">
          {t('transactions:expenses')}
        </button>
      </div>
      <div className="h-52 overflow-y-auto">
        {incomes?.map((expense) => (
          <FinancialMovements
            key={expense.id}
            id={expense.id}
            category={expense.category}
            amount={expense.amount}
            type="incomes"
            mutateOnDelete={incomeMutate}
          />
        ))}
      </div>
    </div>
  );
}
