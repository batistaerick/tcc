'use client';
import useMonthlyTransactions from '@/hooks/useMonthlyTransactions';
import usePredictions from '@/hooks/usePrediction';
import { Expense, Income } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { FcBearish, FcBullish } from 'react-icons/fc';

interface HookDataType {
  data: { incomes: Income[]; expenses: Expense[] };
}

export default function Balance() {
  const { t } = useTranslation();
  const { data }: HookDataType = useMonthlyTransactions();
  const { data: predictionValue } = usePredictions();

  function totalExpenses() {
    return (
      data?.expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0
    );
  }

  function totalIncomes() {
    return (
      data?.incomes?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0
    );
  }

  return (
    <div className="flex cursor-default">
      <div className="mx-5 h-48 w-full rounded-xl bg-indigo-800">
        <div className="flex items-center justify-between px-10 pt-5">
          <div>
            <div className="text-left">{t('balance:totalBalance')}</div>
            <div
              className={`
                text-left text-3xl
                ${predictionValue < 0 ? 'text-rose-500' : 'text-green-400'}
              `}
            >
              ${predictionValue}
            </div>
          </div>
        </div>
        <div className="flex justify-between px-10 pt-4 text-sm">
          <div>
            <div>{t('balance:expense')}</div>
            <div className="flex items-center justify-start gap-1">
              <FcBearish size={35} />
              <div>
                <div>${totalExpenses()}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <div>
              <div>{t('balance:income')}</div>
              <div className="flex items-center justify-end gap-1">
                <FcBullish size={35} />
                <div>${totalIncomes()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
