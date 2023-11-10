export interface LanguageMap {
  api: {
    differentPasswords: string;
    invalidUsername: string;
    missingCredentials: string;
    wrongCredentials: string;
  };
  account: {
    username: string;
    newPassword: string;
    confirmPassword: string;
  };
  auth: {
    alreadyHaveAccount: string;
    email: string;
    login: string;
    newInHere: string;
    password: string;
    signIn: string;
    signUp: string;
    username: string;
  };
  balance: {
    expense: string;
    income: string;
    totalBalance: string;
  };
  button: {
    newTransaction: string;
  };
  categoryOption: {
    chooseCategory: string;
  };
  dropdownMenu: {
    account: string;
    signOut: string;
  };
  newTransaction: {
    value: string;
    cancel: string;
    category: string;
    expenseOption: string;
    incomeOption: string;
    fixedExpenseOption: string;
    fixedIncomeOption: string;
    chooseType: string;
    transactionType: string;
    notes: string;
    save: string;
  };
  prediction: string;
  transactions: {
    expenses: string;
    incomes: string;
  };
}
