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
      currentUser: { id: userId, savedMoney },
    } = await serverAuth();

    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const numberOfMonths = totalOfMonths(new Date(context.params.endDate));
    let endDate = addMonths(startDate, numberOfMonths);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);

    const expenses = await prismadb.expense.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const incomes = await prismadb.income.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const fixedExpenses = await prismadb.fixedExpense.findMany({
      where: {
        userId,
      },
    });

    const fixedIncomes = await prismadb.fixedIncome.findMany({
      where: {
        userId,
      },
    });

    const total = prediction(
      expenses,
      incomes,
      fixedExpenses,
      fixedIncomes,
      savedMoney,
      numberOfMonths
    );

    return new Response(JSON.stringify(total));
  } catch (error) {
    console.error(error);
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

function totalOfMonths(endDate: Date) {
  const start = new Date();
  const diffInMonths = (endDate.getFullYear() - start.getFullYear()) * 12;
  const monthDiff = endDate.getMonth() - start.getMonth();
  const amount = diffInMonths + monthDiff;
  return amount;
}

function prediction(
  expenses: Expense[],
  incomes: Income[],
  fixedExpenses: FixedExpense[],
  fixedIncomes: FixedIncome[],
  savedMoney: number,
  numberOfMonths: number
) {
  const totalExpenses =
    expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  const totalFixedExpenses =
    fixedExpenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  const totalIncomes =
    incomes?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  const totalFixedIncomes =
    fixedIncomes?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;

  savedMoney ??= 0;

  const amount =
    savedMoney +
    totalIncomes +
    totalFixedIncomes * numberOfMonths -
    totalExpenses -
    totalFixedExpenses * numberOfMonths;

  return amount;
}
