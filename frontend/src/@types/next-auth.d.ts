import { Role, Transaction } from '@/types/types';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    password: string;
    profileImage?: Uint8Array;
    refreshToken: string;
    refreshTokenExpires: number;
    accessToken: string;
    accessTokenExpires: number;
    roles: Role[];
    transactions: Transaction[];
    authorities: Role[];
  }
}
