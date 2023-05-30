import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export async function GET(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const fixedExpenses = await prismadb.fixedExpense.findMany({
      where: {
        userId,
      },
    });

    return new Response(JSON.stringify(fixedExpenses));
  } catch (error) {
    console.error(error);
  }
}
