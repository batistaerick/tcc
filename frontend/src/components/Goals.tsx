'use client';
import Goal from '@/components/Goal';
import { TransactionType } from '@/enums/enums';
import useFixedTransactions from '@/hooks/useFixedTransactions';
import useTransactions from '@/hooks/useTransactions';
import { Transaction } from '@/types/types';
import { useTranslation } from 'react-i18next';

export default function Goals() {
  const { t } = useTranslation();
  const { data: fixedExpenses } = useFixedTransactions(
    TransactionType.FIXED_EXPENSE
  );
  const { data: fixedIncomes } = useFixedTransactions(
    TransactionType.FIXED_INCOME
  );
  const { data: incomes } = useTransactions(TransactionType.INCOME);
  const { data: expenses } = useTransactions(TransactionType.EXPENSE);

  function labels(
    transactions: Transaction[],
    fixedTransactions: Transaction[]
  ): string[] {
    const transactionCategories = transactions.map(
      (transaction) => transaction.category
    );
    const fixedTransactionCategories = fixedTransactions.map(
      (transaction) => transaction.category
    );
    return [...transactionCategories, ...fixedTransactionCategories];
  }

  function total(
    transactions: Transaction[],
    fixedTransactions: Transaction[]
  ): Transaction[] {
    return [...transactions, ...fixedTransactions];
  }

  return (
    <div className="flex w-11/12 flex-col gap-2">
      <div className="flex flex-row justify-between rounded-xl bg-slate-600 p-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <div>Incomes</div>
          <Goal<Transaction>
            label="Income"
            height="h-52"
            labels={labels(incomes ?? [], fixedIncomes ?? [])}
            data={total(incomes ?? [], fixedIncomes ?? [])}
          />
        </div>
        <div className="">test</div>
      </div>
      <div className="flex flex-row justify-between rounded-xl bg-slate-600 p-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <div>Incomes</div>
          <Goal<Transaction>
            label="Expense"
            height="h-52"
            labels={labels(expenses ?? [], fixedExpenses ?? [])}
            data={total(expenses ?? [], fixedExpenses ?? [])}
          />
        </div>
        <div>test</div>
      </div>
      <div className="flex flex-row justify-between rounded-xl bg-slate-600 p-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <div>Balance</div>
          <Goal<Transaction>
            label="Balance"
            height="h-52"
            labels={[
              ...labels(incomes ?? [], fixedIncomes ?? []),
              ...labels(incomes ?? [], fixedExpenses ?? []),
            ]}
            data={[
              ...total(incomes ?? [], fixedIncomes ?? []),
              ...total(expenses ?? [], fixedExpenses ?? []),
            ]}
          />
        </div>
        <div>test</div>
      </div>
    </div>
  );
}
