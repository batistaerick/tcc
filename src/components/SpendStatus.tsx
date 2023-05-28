'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import useExpenseList from '@/hooks/useExpenseList';
import useIncomeList from '@/hooks/useIncomeList';
import { Expense, Income, User } from '@prisma/client';

export default function SpendStatus() {
  const { data: user }: { data: User } = useCurrentUser();
  const { data: expenses }: { data: Expense[] } = useExpenseList();
  const { data: incomes }: { data: Income[] } = useIncomeList();

  return (
    <div className="flex my-3">
      <div className="bg-gray-600 w-full h-24 mx-5 rounded-xl">
        <div className="mt-2 ml-2">Forecast</div>
        <div className="ml-2">$3,000.00 out of $7,000.00</div>
        <div className="mx-2 w-full">Rage bar</div>
      </div>
    </div>
  );
}
