import Money from '@/components/Money';
import { TransactionType } from '@/enums/enums';
import useFixedTransactions from '@/hooks/useFixedTransactions';
import usePredictions from '@/hooks/usePrediction';
import useTransactions from '@/hooks/useTransactions';
import { Transaction } from '@/types/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FcBearish, FcBullish } from 'react-icons/fc';

export default function Balance() {
  const { t } = useTranslation();
  const { data: predictionValue } = usePredictions();
  const { data: fixedExpenses } = useFixedTransactions(
    TransactionType.FIXED_EXPENSE
  );
  const { data: fixedIncomes } = useFixedTransactions(
    TransactionType.FIXED_INCOME
  );
  const { data: incomes } = useTransactions(TransactionType.INCOME);
  const { data: expenses } = useTransactions(TransactionType.EXPENSE);

  const totalExpenses = useMemo(() => {
    const expenses =
      incomes
        ?.filter(
          (transaction) =>
            transaction.transactionType === TransactionType.EXPENSE
        )
        ?.reduce?.(
          (sum: number, transaction: Transaction) =>
            sum + (transaction?.value ?? 0),
          0
        ) ?? 0;
    const expensesFixed =
      fixedExpenses?.reduce?.(
        (sum: number, transaction: Transaction) =>
          sum + (transaction?.value ?? 0),
        0
      ) ?? 0;

    return expenses + expensesFixed;
  }, [incomes, fixedExpenses]);

  const totalIncomes = useMemo(() => {
    const incomes =
      expenses
        ?.filter(
          (transaction) =>
            transaction.transactionType === TransactionType.INCOME
        )
        ?.reduce(
          (sum: number, transaction: Transaction) =>
            sum + (transaction?.value ?? 0),
          0
        ) ?? 0;
    const incomesFixed =
      fixedIncomes?.reduce?.(
        (sum: number, transaction: Transaction) =>
          sum + (transaction?.value ?? 0),
        0
      ) ?? 0;

    return incomes + incomesFixed;
  }, [expenses, fixedIncomes]);

  return (
    <div className="flex cursor-default">
      <div className="h-48 w-[350px] rounded-xl bg-slate-600 md:w-[700px]">
        <div className="flex items-center justify-between px-10 pt-5">
          <div>
            <div className="text-left">{t('balance:totalBalance')}</div>
            <Money
              className="text-left text-3xl"
              value={predictionValue ?? 0}
            />
          </div>
        </div>
        <div className="flex justify-between px-10 pt-4 text-sm">
          <div>
            <div>{t('balance:expense')}</div>
            <div className="flex items-center justify-start gap-1">
              <FcBearish size={35} />
              <div>
                <Money value={totalExpenses} />
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <div>
              <div>{t('balance:income')}</div>
              <div className="flex items-center justify-end gap-1">
                <FcBullish size={35} />
                <Money value={totalIncomes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
