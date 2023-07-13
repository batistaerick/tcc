import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { FixedExpense, FixedIncome } from '@prisma/client';

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

    const { type, date, ...data } = form;

    if (type !== 'income' && type !== 'expense') {
      throw new Error('Invalid transaction type');
    }
    let transaction: FixedExpense | FixedIncome;

    if (type === 'income') {
      transaction = await prismadb.fixedIncome.create({ data });
    } else {
      transaction = await prismadb.fixedExpense.create({ data });
    }
    return new Response(JSON.stringify(transaction));
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const fixedIncomes = await prismadb.fixedIncome.findMany({
      where: { userId },
    });

    const fixedExpenses = await prismadb.fixedExpense.findMany({
      where: { userId },
    });
    return new Response(JSON.stringify({ fixedExpenses, fixedIncomes }));
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
    if (type !== 'fixedExpense' && type !== 'fixedIncome') {
      throw new Error('Invalid transaction type');
    }
    let existingTransaction;

    if (type === 'fixedExpense') {
      existingTransaction = await prismadb.fixedExpense.findUnique({
        where: { id },
      });
    } else {
      existingTransaction = await prismadb.fixedIncome.findUnique({
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

    if (type === 'fixedExpense') {
      deletedExpense = await prismadb.fixedExpense.delete({
        where: { id },
      });
    } else {
      deletedExpense = await prismadb.fixedIncome.delete({
        where: { id },
      });
    }
    return new Response(JSON.stringify(deletedExpense));
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}
