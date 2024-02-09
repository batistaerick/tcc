import Goal from '@/components/Goal';
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

  function total(
    transactions: Transaction[] | undefined,
    fixedTransactions: Transaction[] | undefined
  ) {
    const amount =
      transactions?.reduce(
        (sum: number, transaction: Transaction) => sum + transaction.value,
        0
      ) ?? 0;
    const fixedAmount =
      fixedTransactions?.reduce(
        (sum: number, transaction: Transaction) => sum + transaction.value,
        0
      ) ?? 0;
    return amount + fixedAmount;
  }

  const totalExpenses = useMemo(
    () => total(expenses, fixedExpenses),
    [expenses, fixedExpenses]
  );

  const totalIncomes = useMemo(
    () => total(incomes, fixedIncomes),
    [incomes, fixedIncomes]
  );

  return (
    <div className="h-48 w-11/12 cursor-default rounded-xl bg-[#bfd8d5] dark:bg-slate-600">
      <div className="flex items-center justify-between px-10 pt-5">
        <div>
          <div className="text-left">{t('balance:totalBalance')}</div>
          <Money className="text-left text-3xl" value={predictionValue ?? 0} />
        </div>
        <Goal<number> height="h-20" data={[totalExpenses, totalIncomes]} />
      </div>
      <div className="flex justify-between px-10 pt-4 text-sm">
        <div className="text-left">
          <div>{t('balance:expense')}</div>
          <div className="flex items-center justify-start gap-1">
            <FcBearish size={35} />
            <div>
              <Money value={totalExpenses} />
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="text-right">
            <div>{t('balance:income')}</div>
            <div className="flex items-center justify-end gap-1">
              <FcBullish size={35} />
              <Money value={totalIncomes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
