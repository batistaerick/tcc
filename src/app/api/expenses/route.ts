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

export async function DELETE(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const id = new URL(request.url).searchParams.get('id');

    if (!id) {
      throw new Error('Invalid ID');
    }
    const existingExpense = await prismadb.expense.findUnique({
      where: {
        id,
      },
    });

    if (!existingExpense) {
      throw new Error('Invalid ID');
    }
    if (existingExpense.userId !== userId) {
      throw new Error('Only the owner can delete');
    }
    const deletedExpense = await prismadb.expense.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedExpense));
  } catch (error) {
    console.error(error);
  }
}
