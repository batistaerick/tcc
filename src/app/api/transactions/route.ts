import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { Expense, Income } from '@prisma/client';

type Form = {
  id: string;
  userId: string;
  category: string;
  notes: string;
  date: Date;
  type: string;
  amount: number;
};

export async function POST(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const form: Form = await request.json();
    form.userId = userId;
    form.amount = Number(form.amount);
    form.date = new Date(form.date);

    const { type, ...data } = form;

    if (type !== 'incomes' && type !== 'expenses') {
      throw new Error('Invalid transaction type');
    }
    let transaction: Expense | Income;

    if (type === 'incomes') {
      transaction = await prismadb.income.create({ data });
    } else {
      transaction = await prismadb.expense.create({ data });
    }
    return new Response(JSON.stringify(transaction));
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
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
    if (type !== 'incomes' && type !== 'expenses') {
      throw new Error('Invalid transaction type');
    }
    const transactionType = type === 'incomes' ? 'income' : 'expense';

    const existingTransaction = await prismadb[transactionType].findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error('Invalid ID');
    }
    if (existingTransaction.userId !== userId) {
      throw new Error('Only the owner can delete');
    }

    const deletedExpense = await prismadb[transactionType].delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedExpense));
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
