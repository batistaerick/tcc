import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { Expense, Income } from '@prisma/client';

interface Form {
  id: string;
  userId: string;
  category: string;
  notes: string;
  date: Date;
  type: string;
  amount: number;
}

export async function POST(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const form: Form = await request.json();
    form.userId = userId;
    form.amount = Number(form.amount);

    const { type, ...data } = form;

    if (type !== 'income' && type !== 'expense') {
      throw new Error('Invalid transaction type');
    }
    let transaction: Expense | Income;

    if (type === 'income') {
      transaction = await prismadb.income.create({ data });
    } else {
      transaction = await prismadb.expense.create({ data });
    }
    return new Response(JSON.stringify(transaction));
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const id = new URL(request.url).searchParams.get('id');
    const type = new URL(request.url).searchParams.get('type');

    if (!id) {
      throw new Error('Invalid ID');
    }
    if (type !== 'income' && type !== 'expense') {
      throw new Error('Invalid transaction type');
    }
    let existingTransaction;

    if (type === 'expense') {
      existingTransaction = await prismadb.expense.findUnique({
        where: { id },
      });
    } else {
      existingTransaction = await prismadb.income.findUnique({
        where: { id },
      });
    }

    if (!existingTransaction) {
      throw new Error('Invalid ID');
    }
    if (existingTransaction.userId !== userId) {
      throw new Error('Only the owner can delete');
    }
    let deletedExpense;

    if (type === 'expense') {
      deletedExpense = await prismadb.expense.delete({ where: { id } });
    } else {
      deletedExpense = await prismadb.income.delete({ where: { id } });
    }
    return new Response(JSON.stringify(deletedExpense));
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}
