'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePredictions from '@/hooks/usePrediction';
import { Expense, Income } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { FcBearish, FcBullish } from 'react-icons/fc';

export default function Balance() {
  const { t } = useTranslation();
  const { data: currentUser } = useCurrentUser();
  const { data: predictionValue } = usePredictions();

  function totalExpenses() {
    return (
      currentUser?.expenses?.reduce(
        (sum: number, expense: Expense) => sum + expense.amount,
        0
      ) ?? 0
    );
  }

  function totalIncomes() {
    return (
      currentUser?.incomes?.reduce(
        (sum: number, income: Income) => sum + income.amount,
        0
      ) ?? 0
    );
  }

  return (
    <div className="flex cursor-default justify-center">
      <div className="h-48 w-[350px] rounded-xl bg-indigo-800 md:w-[700px]">
        <div className="flex items-center justify-between px-10 pt-5">
          <div>
            <div className="text-left">{t('balance:totalBalance')}</div>
            <div className="text-left text-3xl">${predictionValue}</div>
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
