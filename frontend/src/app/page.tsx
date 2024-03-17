'use client';
import Balance from '@/components/Balance';
import DefaultBackground from '@/components/DefaultBackground';
import Header from '@/components/Header';
import ModalError from '@/components/Modals/ModalError';
import NewTransaction from '@/components/NewTransaction';
import Transactions from '@/components/Transactions';
import { TransactionType } from '@/enums/enums';
import useTransactions from '@/hooks/useTransactions';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const {
    data: incomesResponse,
    mutate: incomesMutate,
    setSize: setIncomesSize,
    size: incomesSize,
  } = useTransactions(TransactionType.INCOME, 10);
  const {
    data: expensesResponse,
    mutate: expensesMutate,
    setSize: setExpensesSize,
    size: expensesSize,
  } = useTransactions(TransactionType.EXPENSE, 10);

  const incomes = useMemo(
    () => incomesResponse?.flatMap((page) => page.content),
    [incomesResponse]
  );
  const expenses = useMemo(
    () => expensesResponse?.flatMap((page) => page.content),
    [expensesResponse]
  );

  async function mutateAll() {
    await Promise.all([incomesMutate(), expensesMutate()]);
  }

  return (
    <DefaultBackground style="flex flex-col items-center gap-2 pt-2">
      <Header dateFormat="MMM/yyyy" />
      <Balance />
      <Transactions
        transactions={incomes}
        transactionsMutate={incomesMutate}
        size={incomesSize}
        setSize={setIncomesSize}
        length={incomesResponse?.length}
        title={t('transactions:incomes')}
      />
      <Transactions
        transactions={expenses}
        transactionsMutate={expensesMutate}
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
