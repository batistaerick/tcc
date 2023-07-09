'use client';
import useMonthlyTransaction from '@/hooks/useMonthlyTransaction';
import { Expense, Income } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { FaChevronRight } from 'react-icons/fa';
import { FcBearish, FcBullish } from 'react-icons/fc';

type hookDataType = {
  data: { incomes: Income[]; expenses: Expense[] };
};

export default function Balance() {
  const { t } = useTranslation();
  const { data }: hookDataType = useMonthlyTransaction();

  function totalBalance() {
    if (data?.expenses && data?.incomes) {
      return (totalIncomes() - totalExpenses()).toFixed(2);
    }
  }

  function totalExpenses() {
    return data?.expenses?.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function totalIncomes() {
    return data?.incomes?.reduce((sum, expense) => sum + expense.amount, 0);
  }

  return (
    <div className="flex cursor-default">
      <div className="mx-5 h-40 w-full rounded-xl bg-indigo-800">
        <div className="flex items-center justify-between px-10 pt-5">
          <div>
            <div className="text-left">{t('balance:totalBalance')}</div>
            <div className="text-left text-3xl">${totalBalance() ?? 0}</div>
          </div>
          <FaChevronRight size={25} />
        </div>
        <div className="flex justify-between px-10 pt-4 text-sm">
          <div className="flex gap-1">
            <FcBearish size={35} />
            <div>
              <div>{t('balance:expense')}</div>
              <div>${totalExpenses() ?? 0}</div>
            </div>
          </div>
          <div className="flex gap-1">
            <FcBullish size={35} />
            <div>
              <div>{t('balance:income')}</div>
              <div>${totalIncomes() ?? 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
