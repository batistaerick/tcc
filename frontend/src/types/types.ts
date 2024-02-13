import { RoleName, TransactionType } from '@/enums/enums';

export interface UpdatedUserType {
  username?: string;
  confirmPassword?: string;
  newPassword?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
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
  notes?: string;
  date: Date;
  value: number;
  transactionType?: TransactionType;
}

export interface Role {
  id: string;
  roleName: RoleName;
}

export interface ResponseError {
  title: string;
  message: string;
}

export interface AnalyticsArgs {
  retention?: number;
}

export interface TrackOptions {
  persist?: boolean;
}
