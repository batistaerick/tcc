import { prismadb } from '@/libs/prismadb';
import { isValidEmail, isValidPassword } from '@/utils/credentialsChecker';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !password) {
      return new Response('missingCredentials', {
        status: 400,
        statusText: 'Please provide both your email and password to sign in.',
      });
    }
    if (!isValidPassword(password)) {
      return new Response('invalidPassword', {
        status: 401,
        statusText:
          'Password must have at least 7 characters, 1 uppercase letter and 1 special character.',
      });
    }
    if (!isValidEmail(email)) {
      return new Response('invalidEmail', {
        status: 401,
        statusText:
          'The email format you provided is invalid. Please enter a valid email address.',
      });
    }
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response('emailTaken', {
        status: 422,
        statusText:
          'The email you provided is already registered. Please use a different email address to sign up.',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });
    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}
