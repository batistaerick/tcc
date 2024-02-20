import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      profileImage: Uint8Array;
      refreshToken: string;
      accessToken: string;
      roles: Role[];
      transactions: Transaction[];
      authorities: Role[];
    };
  }
}
