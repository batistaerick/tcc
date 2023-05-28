import { prismadb } from '@/libs/prismadb';
import { expenseOptions, incomeOptions } from '@/utils/categoryOptions';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response('Error', { status: 422, statusText: 'Email taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        savedMoney: 0,
        expenseOptions: expenseOptions,
        incomeOptions: incomeOptions,
        emailVerified: new Date(),
      },
    });
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}
