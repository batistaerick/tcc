'use client';
import useMonthlyExpenses from '@/hooks/useMonthlyExpenses';
import useMonthlyIncomes from '@/hooks/useMonthlyIncomes';
import { Expense, Income } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { FaChevronRight } from 'react-icons/fa';
import { FcBearish, FcBullish } from 'react-icons/fc';

export default function Balance() {
  const { t } = useTranslation();
  const { data: expenses }: { data: Expense[] } = useMonthlyExpenses();
  const { data: incomes }: { data: Income[] } = useMonthlyIncomes();

  function totalBalance() {
    if (expenses && incomes) {
      return (totalIncomes() - totalExpenses()).toFixed(2);
    }
  }

  function totalExpenses() {
    return expenses?.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function totalIncomes() {
    return incomes?.reduce((sum, expense) => sum + expense.amount, 0);
  }

  return (
    <div className="flex cursor-default">
      <div className="mx-5 h-40 w-full rounded-xl bg-indigo-800">
        <div className="flex items-center justify-between px-10 pt-5">
          <div>
            <div className="text-left">{t('balance:totalBalance')}</div>
            <div className="text-left text-3xl">${totalBalance()}</div>
          </div>
          <FaChevronRight size={25} />
        </div>
        <div className="flex justify-between px-10 pt-4 text-sm">
          <div className="flex gap-1">
            <FcBearish size={35} />
            <div>
              <div>{t('balance:expense')}</div>
              <div>${totalExpenses() ?? ''}</div>
            </div>
          </div>
          <div className="flex gap-1">
            <FcBullish size={35} />
            <div>
              <div>{t('balance:income')}</div>
              <div>${totalIncomes() ?? ''}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
