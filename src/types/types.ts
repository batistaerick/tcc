export interface NewTransactionFormType {
  amount: number | string;
  category: string;
  notes: string;
  date: Date;
  type: string;
}

export interface UpdatedUserType {
  username?: string;
  confirmPassword?: string;
  newPassword?: string;
  image?: string;
}
