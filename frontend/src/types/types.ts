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

export interface Role {
  id: string;
  roleName: RoleName;
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

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginatedTransactions {
  content: Transaction[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Analytic {
  id: string;
  path: string;
  countries: Map<Date, string[]>;
  accesses: Map<Date, number>;
}

export interface ResponseError {
  title: string;
  message: string;
}

export interface IPInfo {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  readme: string;
}
