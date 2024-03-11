'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import NewTransaction from '@/components/NewTransaction';
import { TransactionType } from '@/enums/enums';
import useFixedTransactions from '@/hooks/useFixedTransactions';
import useTransactions from '@/hooks/useTransactions';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

const DynamicHeader = dynamic(() => import('@/components/Header'), {
  loading: () => <header className="h-12 w-10/12 rounded-xl" />,
});
const DynamicBalance = dynamic(() => import('@/components/Balance'), {
  loading: () => (
    <div className="h-52 w-10/12 cursor-default rounded-xl bg-slate-700 bg-opacity-60" />
  ),
});
const DynamicTransactions = dynamic(() => import('@/components/Transactions'), {
  loading: () => (
    <div className="h-[252px] w-10/12 rounded-xl bg-blue-950 bg-opacity-65" />
  ),
});

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
    <DefaultBackground>
      <div className="w-10/12">
        <DynamicHeader dateFormat="MMM/yyyy" />
      </div>
      <DynamicBalance />
      <DynamicTransactions
        transactions={incomesResponse?.flatMap((page) => page.content)}
        transactionsMutate={incomesMutate}
        fixedTransactions={fixedIncomes}
        fixedTransactionsMutate={fixedIncomesMutate}
        size={incomesSize}
        setSize={setIncomesSize}
        length={incomesResponse?.length}
        title={t('transactions:incomes')}
      />
      <DynamicTransactions
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
