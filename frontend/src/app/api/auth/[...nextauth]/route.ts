import { postFetcher } from '@/libs/fetchers';
import { User } from '@/types/types';
import { buildAuth, buildHeadersAuthorization } from '@/utils/headerToken';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

async function refreshAccessToken(token: JWT) {
  try {
    const { accessToken, accessTokenExpires } = await postFetcher<User>(
      '/auth/login',
      undefined,
      buildHeadersAuthorization(String(token.refreshToken))
    );
    return {
      ...token,
      accessToken,
      accessTokenExpires,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('missingCredentials');
          }
          const user = await postFetcher<User>(
            '/auth/login',
            undefined,
            buildAuth(credentials.email, credentials.password)
          );

          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          throw Error('wrongCredentials');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.refreshToken = user.refreshToken;
        token.refreshTokenExpires = user.refreshTokenExpires;
      }
      const currentDate = new Date(new Date().toUTCString());
      const accessTokenExpires = new Date(token.accessTokenExpires * 1000);

      if (currentDate > accessTokenExpires) {
        return refreshAccessToken(token);
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: { ...token },
      };
    },
  },
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
    maxAge: 604800,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
