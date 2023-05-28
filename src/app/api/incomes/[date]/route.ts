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
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const incomes = await prismadb.income.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return new Response(JSON.stringify(incomes));
  } catch (error) {
    console.error(error);
  }
}
