import { TransactionType } from '@/enums/enums';
import useFixedExpenses from '@/hooks/useFixedExpenses';
import useFixedIncomes from '@/hooks/useFixedIncomes';
import useTransactions from '@/hooks/useTransactions';
import { useTranslation } from 'react-i18next';
import FinancialMovements from './FinancialMovements';

export default function Transactions() {
  const { t } = useTranslation();
  const { data: transactions, mutate: transactionsMutate } = useTransactions();
  const { data: fixedExpenses, mutate: fixedExpensesMutate } =
    useFixedExpenses();
  const { data: fixedIncomes, mutate: fixedIncomesMutate } = useFixedIncomes();

  console.log(transactions);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[350px] rounded-xl bg-blue-950 md:w-[700px]">
        <div className="flex items-center justify-center font-semibold text-rose-500">
          {t('transactions:expenses')}
        </div>
        <div className="h-56 overflow-y-auto">
          {transactions
            ?.filter(
              (transaction) =>
                transaction.transactionType === TransactionType.EXPENSE
            )
            ?.map((transaction) => (
              <FinancialMovements
                key={transaction.id}
                id={transaction.id}
                category={transaction.category}
                amount={transaction.value}
                type="expense"
                mutateOnDelete={transactionsMutate}
              />
            ))}
          {fixedExpenses?.map((transaction) => (
            <FinancialMovements
              key={transaction.id}
              id={transaction.id}
              category={transaction.category}
              amount={transaction.value}
              type="fixedExpense"
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
          {transactions
            ?.filter(
              (transaction) =>
                transaction.transactionType === TransactionType.INCOME
            )
            ?.map((transaction) => (
              <FinancialMovements
                key={transaction.id}
                id={transaction.id}
                category={transaction.category}
                amount={transaction.value}
                type="expense"
                mutateOnDelete={transactionsMutate}
              />
            ))}
          {fixedIncomes?.map((transaction) => (
            <FinancialMovements
              key={transaction.id}
              id={transaction.id}
              category={transaction.category}
              amount={transaction.value}
              type="fixedExpense"
              mutateOnDelete={fixedIncomesMutate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
