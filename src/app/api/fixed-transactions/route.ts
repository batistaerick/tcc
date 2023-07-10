import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { FixedExpense, FixedIncome } from '@prisma/client';

interface Form {
  id: string;
  userId: string;
  category: string;
  notes: string;
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

    if (type !== 'incomes' && type !== 'expenses') {
      throw new Error('Invalid transaction type');
    }
    let transaction: FixedExpense | FixedIncome;

    if (type === 'incomes') {
      transaction = await prismadb.fixedIncome.create({ data });
    } else {
      transaction = await prismadb.fixedExpense.create({ data });
    }
    return new Response(JSON.stringify(transaction));
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
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
    console.error(error);
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
    const transactionType = type === 'incomes' ? 'fixedIncome' : 'fixedExpense';

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
