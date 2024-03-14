'use client';
import Balance from '@/components/Balance';
import DefaultBackground from '@/components/DefaultBackground';
import Header from '@/components/Header';
import ModalError from '@/components/Modals/ModalError';
import NewTransaction from '@/components/NewTransaction';
import Transactions from '@/components/Transactions';
import { TransactionType } from '@/enums/enums';
import useFixedTransactions from '@/hooks/useFixedTransactions';
import useTransactions from '@/hooks/useTransactions';
import { useTranslation } from 'react-i18next';

export default function Home() {
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

  async function mutateAll() {
    await Promise.all([
      fixedExpensesMutate(),
      fixedIncomesMutate(),
      expensesMutate(),
      incomesMutate(),
    ]);
  }

  return (
    <DefaultBackground style="flex flex-col items-center gap-2 pt-2">
      <Header dateFormat="MMM/yyyy" />
      <Balance />
      <Transactions
        transactions={incomesResponse?.flatMap((page) => page.content)}
        transactionsMutate={incomesMutate}
        fixedTransactions={fixedIncomes}
        fixedTransactionsMutate={fixedIncomesMutate}
        size={incomesSize}
        setSize={setIncomesSize}
        length={incomesResponse?.length}
        title={t('transactions:incomes')}
      />
      <Transactions
        transactions={expensesResponse?.flatMap((page) => page.content)}
        transactionsMutate={expensesMutate}
        fixedTransactions={fixedExpenses}
        fixedTransactionsMutate={fixedExpensesMutate}
        size={expensesSize}
        setSize={setExpensesSize}
        length={expensesResponse?.length}
        title={t('transactions:expenses')}
      />
      <NewTransaction mutateAll={mutateAll} />
      <ModalError />
    </DefaultBackground>
  );
}
