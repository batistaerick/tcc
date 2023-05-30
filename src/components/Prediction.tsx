'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFixedExpenses from '@/hooks/useFixedExpenses';
import useFixedIncomes from '@/hooks/useFixedIncomes';
import usePredictionExpense from '@/hooks/usePredictionExpense';
import usePredictionIncome from '@/hooks/usePredictionIncome';
import {
  Expense,
  FixedExpense,
  FixedIncome,
  Income,
  User,
} from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import DatePickerDialog from './DatePickerDialog';

export default function Prediction() {
  const [date, setDate] = useState(new Date());
  const [totalOfMonths, setTotalOfMonths] = useState(1);
  const { data: user }: { data: User } = useCurrentUser();
  const { data: expenses }: { data: Expense[] } =
    usePredictionExpense(totalOfMonths);
  const { data: fixedExpenses }: { data: FixedExpense[] } = useFixedExpenses();
  const { data: incomes }: { data: Income[] } =
    usePredictionIncome(totalOfMonths);
  const { data: fixedIncomes }: { data: FixedIncome[] } = useFixedIncomes();

  useEffect(() => {
    const start = new Date();
    const diffInMonths = (date.getFullYear() - start.getFullYear()) * 12;
    const monthDiff = date.getMonth() - start.getMonth();
    setTotalOfMonths(diffInMonths + monthDiff - 1);
  }, [date]);

  const prediction = useCallback(() => {
    const totalExpenses =
      expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
    const totalFixedExpenses =
      fixedExpenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
    const totalIncomes =
      incomes?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
    const totalFixedIncomes =
      fixedIncomes?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;

    const amount =
      (user?.savedMoney ?? 0) +
      totalIncomes +
      totalFixedIncomes * totalOfMonths -
      totalExpenses -
      totalFixedExpenses * totalOfMonths;

    return amount;
  }, [expenses, fixedExpenses, fixedIncomes, incomes, totalOfMonths, user]);

  return (
    <div className="my-3 flex">
      <div className="mx-5 h-24 w-full rounded-xl bg-gray-600">
        <div className="grid h-full grid-cols-2">
          <div className="flex h-full flex-col items-center justify-center">
            <div>Prediction</div>
            <div>${prediction() ?? ''}</div>
          </div>
          <div>
            <div className="flex h-full flex-col items-center justify-center">
              <DatePickerDialog
                date={date}
                setDate={setDate}
                dateFormat="MMMM/yyyy"
                showMonthYearPicker
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
