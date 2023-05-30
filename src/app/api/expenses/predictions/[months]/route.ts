import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { addMonths } from '@/utils/IncreaseMonths';

interface TypeContext {
  params: {
    months: number;
  };
}

export async function GET(request: Request, context: TypeContext) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = addMonths(startDate, context.params.months);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);

    const expenses = await prismadb.expense.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return new Response(JSON.stringify(expenses));
  } catch (error) {
    console.error(error);
  }
}
