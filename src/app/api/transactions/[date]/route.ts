import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

interface TypeContext {
  params: {
    date: string;
  };
}

export async function GET(request: Request, context: TypeContext) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const date = new Date(context.params.date);
    const gte = new Date(date.getFullYear(), date.getMonth(), 1);
    const lte = new Date(date.getFullYear(), date.getMonth() + 1, 0);

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

    const response = { expenses, incomes };

    return new Response(JSON.stringify(response));
  } catch (error) {
    console.error(error);
  }
}
