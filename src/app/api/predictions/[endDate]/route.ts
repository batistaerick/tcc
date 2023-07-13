import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { Expense, FixedExpense, FixedIncome, Income } from '@prisma/client';

interface TypeContext {
  params: {
    endDate: string;
  };
}

export async function GET(request: Request, context: TypeContext) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const date = new Date();
    const gte = new Date(date.getFullYear(), date.getMonth(), 1);
    const numberOfMonths = totalOfMonths(gte, new Date(context.params.endDate));
    const monthsAdded = addMonths(gte, numberOfMonths);
    const lte = new Date(
      monthsAdded.getFullYear(),
      monthsAdded.getMonth() + 1,
      0
    );

    const expenses = await prismadb.expense.findMany({
      where: {
        userId,
        date: { gte, lte },
      },
    });

    const incomes = await prismadb.income.findMany({
      where: {
        userId,
        date: { gte, lte },
      },
    });

    const fixedExpenses = await prismadb.fixedExpense.findMany({
      where: { userId },
    });

    const fixedIncomes = await prismadb.fixedIncome.findMany({
      where: { userId },
    });

    const total = prediction(
      expenses,
      incomes,
      fixedExpenses,
      fixedIncomes,
      numberOfMonths
    );

    return new Response(JSON.stringify(total));
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}

function addMonths(date: Date, numberOfMonths: number): Date {
  const newDate = new Date(date.getTime());

  const currentMonth = newDate.getMonth();
  const newMonth = currentMonth + numberOfMonths;

  const yearOffset = Math.floor(newMonth / 12);
  const remainingMonths = newMonth % 12;

  newDate.setMonth(remainingMonths);
  newDate.setFullYear(newDate.getFullYear() + yearOffset);

  return newDate;
}

function totalOfMonths(startDate: Date, endDate: Date) {
  const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  const monthDiff = endDate.getMonth() - startDate.getMonth();
  const amount = diffInMonths + monthDiff;
  return amount;
}

function prediction(
  expenses: Expense[],
  incomes: Income[],
  fixedExpenses: FixedExpense[],
  fixedIncomes: FixedIncome[],
  numberOfMonths: number = 0
) {
  const totalExpenses =
    expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  const totalFixedExpenses =
    fixedExpenses?.reduce(
      (sum, fixedExpense) => sum + fixedExpense.amount,
      0
    ) ?? 0;
  const totalIncomes =
    incomes?.reduce((sum, income) => sum + income.amount, 0) ?? 0;
  const totalFixedIncomes =
    fixedIncomes?.reduce((sum, fixedIncome) => sum + fixedIncome.amount, 0) ??
    0;

  const amount =
    totalIncomes +
    totalFixedIncomes * numberOfMonths -
    (totalExpenses + totalFixedExpenses * numberOfMonths);

  return amount;
}
