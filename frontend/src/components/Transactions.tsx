import SingleTransaction from '@/components/SingleTransaction';
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
    <>
      <SingleTransaction
        transactions={expenses}
        transactionsMutate={expensesMutate}
        fixedTransactions={fixedExpenses}
        fixedTransactionsMutate={fixedExpensesMutate}
        title={t('transactions:expenses')}
        style="text-red-800 text-xl dark:text-red-700"
      />
      <SingleTransaction
        transactions={incomes}
        transactionsMutate={incomesMutate}
        fixedTransactions={fixedIncomes}
        fixedTransactionsMutate={fixedIncomesMutate}
        title={t('transactions:incomes')}
        style="text-green-800 text-xl dark:text-green-700"
      />
    </>
  );
}
