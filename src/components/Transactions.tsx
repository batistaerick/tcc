'use client';
import useMonthlyExpenses from '@/hooks/useMonthlyExpenses';
import useMonthlyIncomes from '@/hooks/useMonthlyIncomes';
import { Expense, Income } from '@prisma/client';
import FinancialMovements from './FinancialMovements';

export default function Transactions() {
  const { data: expenses }: { data: Expense[] } = useMonthlyExpenses();
  const { data: incomes }: { data: Income[] } = useMonthlyIncomes();

  return (
    <div>
      <div className="mx-5 flex justify-between">
        <div className="font-semibold text-indigo-600">Expenses</div>
        <button className="font-semibold text-indigo-600">View all</button>
      </div>
      <div className="h-52 overflow-y-auto">
        {expenses?.map((expense) => (
          <FinancialMovements
            key={expense.id}
            category={expense.category}
            amount={expense.amount}
          />
        ))}
      </div>
      <div className="mx-5 flex justify-between">
        <div className="font-semibold text-indigo-600">Incomes</div>
        <button className="font-semibold text-indigo-600">View all</button>
      </div>
      <div className="h-52 overflow-y-auto">
        {incomes?.map((expense) => (
          <FinancialMovements
            key={expense.id}
            category={expense.category}
            amount={expense.amount}
          />
        ))}
      </div>
    </div>
  );
}
