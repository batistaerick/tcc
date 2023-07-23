import useCurrentUser from '@/hooks/useCurrentUser';
import { Expense, FixedExpense, FixedIncome, Income } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import FinancialMovements from './FinancialMovements';

export default function Transactions() {
  const { t } = useTranslation();
  const { data: currentUser, mutate } = useCurrentUser();

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[350px] rounded-xl bg-blue-950 md:w-[700px]">
        <div className="flex items-center justify-center font-semibold text-rose-500">
          {t('transactions:expenses')}
        </div>
        <div className="h-56 overflow-y-auto">
          {currentUser?.expenses?.map((expense: Expense) => (
            <FinancialMovements
              key={expense.id}
              id={expense.id}
              category={expense.category}
              amount={expense.amount}
              type="expense"
              mutateOnDelete={mutate}
            />
          ))}
          {currentUser?.fixedExpenses?.map((fixedExpense: FixedExpense) => (
            <FinancialMovements
              key={fixedExpense.id}
              id={fixedExpense.id}
              category={fixedExpense.category}
              amount={fixedExpense.amount}
              type="fixedExpense"
              mutateOnDelete={mutate}
            />
          ))}
        </div>
      </div>
      <div className="w-[350px] rounded-xl bg-blue-950 md:w-[700px]">
        <div className="flex items-center justify-center font-semibold text-green-400">
          {t('transactions:incomes')}
        </div>
        <div className="h-56 overflow-y-auto">
          {currentUser?.incomes?.map((income: Income) => (
            <FinancialMovements
              key={income.id}
              id={income.id}
              category={income.category}
              amount={income.amount}
              type="income"
              mutateOnDelete={mutate}
            />
          ))}
          {currentUser?.fixedIncomes?.map((fixedIncome: FixedIncome) => (
            <FinancialMovements
              key={fixedIncome.id}
              id={fixedIncome.id}
              category={fixedIncome.category}
              amount={fixedIncome.amount}
              type="fixedIncome"
              mutateOnDelete={mutate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
