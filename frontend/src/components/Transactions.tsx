import FinancialMovements from '@/components/FinancialMovements';
import { TransactionType } from '@/enums/enums';
import useFixedTransactions from '@/hooks/useFixedTransactions';
import useTransactions from '@/hooks/useTransactions';
import { useTranslation } from 'react-i18next';

export default function Transactions() {
  const { t } = useTranslation();
  const { data: fixedExpenses, mutate: fixedExpensesMutate } =
    useFixedTransactions(TransactionType.FIXED_EXPENSE);
  const { data: fixedIncomes, mutate: fixedIncomesMutate } =
    useFixedTransactions(TransactionType.FIXED_INCOME);
  const { data: incomes, mutate: incomesMutate } = useTransactions(
    TransactionType.INCOME
  );
  const { data: expenses, mutate: expensesMutate } = useTransactions(
    TransactionType.EXPENSE
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[350px] rounded-xl bg-blue-950 md:w-[700px]">
        <div className="flex items-center justify-center font-semibold text-rose-500">
          {t('transactions:expenses')}
        </div>
        <div className="h-56 overflow-y-auto">
          {expenses?.map((transaction) => (
            <FinancialMovements
              key={transaction.id}
              transaction={transaction}
              mutateOnDelete={expensesMutate}
            />
          ))}
          {fixedExpenses?.map((transaction) => (
            <FinancialMovements
              key={transaction.id}
              transaction={transaction}
              mutateOnDelete={fixedExpensesMutate}
            />
          ))}
        </div>
      </div>
      <div className="w-[350px] rounded-xl bg-blue-950 md:w-[700px]">
        <div className="flex items-center justify-center font-semibold text-green-400">
          {t('transactions:incomes')}
        </div>
        <div className="h-56 overflow-y-auto">
          {incomes?.map((transaction) => (
            <FinancialMovements
              key={transaction.id}
              transaction={transaction}
              mutateOnDelete={incomesMutate}
            />
          ))}
          {fixedIncomes?.map((transaction) => (
            <FinancialMovements
              key={transaction.id}
              transaction={transaction}
              mutateOnDelete={fixedIncomesMutate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
