import SingleTransaction from '@/components/SingleTransaction';
import { TransactionType } from '@/enums/enums';
import useFixedTransactions from '@/hooks/useFixedTransactions';
import useTransactions from '@/hooks/useTransactions';

export default function Transactions() {
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
    <>
      <SingleTransaction
        transactions={expenses}
        transactionsMutate={expensesMutate}
        fixedTransactions={fixedExpenses}
        fixedTransactionsMutate={fixedExpensesMutate}
        textColor="text-red-600"
      />
      <SingleTransaction
        transactions={incomes}
        transactionsMutate={incomesMutate}
        fixedTransactions={fixedIncomes}
        fixedTransactionsMutate={fixedIncomesMutate}
        textColor="text-green-600"
      />
    </>
  );
}
