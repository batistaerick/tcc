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
      currentUser: { id },
    } = await serverAuth();

    const date = new Date(context.params.date);
    const gte = new Date(date.getFullYear(), date.getMonth(), 1);
    const lte = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const user = await prismadb.user.findUnique({
      where: { id },
      include: {
        expenses: { where: { date: { gte, lte } } },
        incomes: { where: { date: { gte, lte } } },
        fixedExpenses: true,
        fixedIncomes: true,
        userImage: true,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}
