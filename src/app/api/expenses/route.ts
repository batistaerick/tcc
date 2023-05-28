import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { Expense } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const expense: Expense = await request.json();
    expense.userId = userId;
    expense.amount = Number(expense.amount);
    expense.date = new Date(expense.date);

    const expenses: Expense = await prismadb.expense.create({
      data: expense,
    });
    return new Response(JSON.stringify(expenses));
  } catch (error) {
    console.error(error);
  }
}
