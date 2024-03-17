import Money from '@/components/Money';
import { TransactionType } from '@/enums/enums';
import useTransactions from '@/hooks/useTransactions';
import { PaginatedTransactions, Transaction } from '@/types/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FcBearish, FcBullish } from 'react-icons/fc';

export default function Balance() {
  const { t } = useTranslation();
  const { data: incomesResponse } = useTransactions(TransactionType.INCOME);
  const { data: expensesResponse } = useTransactions(TransactionType.EXPENSE);

  function total(paginatedTransactions: PaginatedTransactions[] | undefined) {
    if (paginatedTransactions) {
      return paginatedTransactions
        .flatMap((pages) => pages.content)
        .reduce(
          (sum: number, transaction: Transaction) =>
            sum + (transaction?.value ?? 0),
          0
        );
    }
    return 0;
  }

  const incomes = useMemo(() => total(incomesResponse), [incomesResponse]);
  const expenses = useMemo(() => total(expensesResponse), [expensesResponse]);

  return (
    <div
      className={`
        flex w-[95%] cursor-default flex-col gap-2
        rounded-xl bg-slate-700 bg-opacity-60 p-3
      `}
    >
      <div className="flex items-center justify-between ">
        <div>
          {t('balance:totalBalance')}
          <Money className="text-left text-3xl" value={incomes - expenses} />
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div className="text-left">
          {t('balance:expense')}
          <div className="flex items-end gap-1">
            <FcBearish size={35} />
            <Money value={expenses} />
          </div>
        </div>
        <div className="flex gap-1">
          <div className="text-end">
            {t('balance:income')}
            <div className="flex items-end justify-end gap-1">
              <Money value={incomes} />
              <FcBullish size={35} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
