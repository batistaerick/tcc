import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { hasValueInside } from '@/utils/checkers';
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from '@/utils/credentialsChecker';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !password) {
      return new Response('missingCredentials', {
        status: 400,
        statusText: 'Please provide both your email and password to sign in.',
      });
    }
    if (name && name.length === 0 && !isValidUsername(name)) {
      return new Response('invalidUsername', {
        status: 401,
        statusText:
          'Username must be maximum 30 characters and can only contain letters, digits, hyphens, and underscores.',
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
    const hashedPassword = await hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
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

export async function PUT(request: Request) {
  try {
    const {
      currentUser: { id },
    } = await serverAuth();

    const data: { name?: string; hashedPassword?: string } =
      await request.json();

    if (!hasValueInside(data)) {
      return new Response('noContent', {
        status: 204,
        statusText: 'Request data is empty',
      });
    }

    if (!data?.name || data.name.length === 0) {
      delete data.name;
    } else if (!isValidUsername(data.name)) {
      return new Response('invalidUsername', {
        status: 401,
        statusText:
          'Username must be maximum 30 characters and can only contain letters, digits, hyphens, and underscores.',
      });
    }

    if (!data?.hashedPassword || data.hashedPassword.length === 0) {
      delete data.hashedPassword;
    } else if (!isValidPassword(data.hashedPassword)) {
      return new Response('invalidPassword', {
        status: 401,
        statusText:
          'Password must have at least 7 characters, 1 uppercase letter and 1 special character.',
      });
    } else {
      data.hashedPassword = await hash(data.hashedPassword, 12);
    }

    await prismadb.user.update({
      where: { id },
      data,
    });
    return new Response('userUpdated', {
      status: 200,
      statusText: 'User data updated.',
    });
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}
