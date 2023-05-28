import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { Income } from '@prisma/client';

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
