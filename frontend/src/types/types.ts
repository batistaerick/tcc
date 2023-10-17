import { RoleName, TransactionType } from '@/enums/enums';

export interface UpdatedUserType {
  username?: string;
  confirmPassword?: string;
  newPassword?: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage: Uint8Array;
  refreshToken: string;
  refreshTokenExpires: number;
  accessToken: string;
  accessTokenExpires: number;
  roles: Role[];
  transactions: Transaction[];
  authorities: Role[];
}

export interface Transaction {
  id: string;
  user?: User;
  category: string;
  notes?: string | null;
  date?: Date | null;
  value?: number;
  transactionType?: TransactionType;
}

export interface NewTransactionFormType {
  value?: number;
  category: string;
  notes: string;
  date: Date | null;
  transactionType?: TransactionType;
}

export interface Role {
  id: string;
  roleName: RoleName;
}
