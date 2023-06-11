import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { Income } from '@prisma/client';

interface TypeContext {
  params: {
    id: string;
  };
}

export async function POST(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const income: Income = await request.json();
    income.userId = userId;
    income.amount = Number(income.amount);
    income.date = new Date(income.date);

    const incomes: Income = await prismadb.income.create({
      data: income,
    });
    return new Response(JSON.stringify(incomes));
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(request: Request) {
  const {
    currentUser: { id: userId },
  } = await serverAuth();

  const id = new URL(request.url).searchParams.get('id');

  if (!id) {
    throw new Error('Invalid ID');
  }
  const existingIncome = await prismadb.income.findUnique({
    where: {
      id,
    },
  });

  if (!existingIncome) {
    throw new Error('Invalid ID');
  }
  if (existingIncome.userId !== userId) {
    throw new Error('Only the owner can delete');
  }

  const deletedIncome = await prismadb.income.delete({
    where: { id },
  });

  return new Response(JSON.stringify(deletedIncome));
}
