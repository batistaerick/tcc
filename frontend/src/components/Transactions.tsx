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

  const {
    data: expensesResponse,
    mutate: expensesMutate,
    setSize: setExpensesSize,
    size: expensesSize,
  } = useTransactions(TransactionType.EXPENSE, 2);
  const {
    data: incomesResponse,
    mutate: incomesMutate,
    setSize: setIncomesSize,
    size: incomesSize,
  } = useTransactions(TransactionType.INCOME, 2);

  return (
    <>
      <SingleTransaction
        transactions={expensesResponse?.flatMap((page) => page.content)}
        transactionsMutate={expensesMutate}
        fixedTransactions={fixedExpenses}
        fixedTransactionsMutate={fixedExpensesMutate}
        size={expensesSize}
        setSize={setExpensesSize}
        length={expensesResponse?.length}
        title={t('transactions:expenses')}
      />
      <SingleTransaction
        transactions={incomesResponse?.flatMap((page) => page.content)}
        transactionsMutate={incomesMutate}
        fixedTransactions={fixedIncomes}
        fixedTransactionsMutate={fixedIncomesMutate}
        size={incomesSize}
        setSize={setIncomesSize}
        length={incomesResponse?.length}
        title={t('transactions:incomes')}
      />
    </>
  );
}
