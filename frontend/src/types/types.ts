import { RoleName, TransactionType } from '@/enums/enums';

export interface NewTransactionFormType {
  value: number | string;
  category: string;
  notes: string;
  date: Date;
  transactionType: string;
}

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
  accessToken: string;
  roles: Role[];
  transactions: Transaction[];
  authorities: Role[];
}

export interface Transaction {
  id: string;
  user: User;
  category: string;
  notes?: string | null;
  date: Date;
  value: number;
  transactionType: TransactionType;
}

export interface Role {
  id: string;
  roleName: RoleName;
}
