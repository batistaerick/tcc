'use client';
import useExpenseList from '@/hooks/useExpenseList';
import useIncomeList from '@/hooks/useIncomeList';
import { Expense, Income } from '@prisma/client';
import FinancialMovements from './FinancialMovements';

export default function Transactions() {
  const { data: expenses }: { data: Expense[] } = useExpenseList();
  const { data: incomes }: { data: Income[] } = useIncomeList();

  return (
    <div>
      <div className="flex justify-between mx-5">
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
      <div className="flex justify-between mx-5">
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
