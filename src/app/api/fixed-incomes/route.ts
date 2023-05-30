import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export async function GET(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const fixedIncomes = await prismadb.fixedIncome.findMany({
      where: {
        userId,
      },
    });

    return new Response(JSON.stringify(fixedIncomes));
  } catch (error) {
    console.error(error);
  }
}
