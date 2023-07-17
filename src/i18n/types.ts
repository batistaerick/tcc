export interface LanguageMap {
  api: {
    emailTaken: string;
    invalidEmail: string;
    invalidPassword: string;
    missingCredentials: string;
    wrongCredentials: string;
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
    settings: string;
    signOut: string;
  };
  newTransaction: {
    amount: string;
    cancel: string;
    category: string;
    expenseOption: string;
    fixed: string;
    incomeOption: string;
    notes: string;
    save: string;
  };
  prediction: string;
  transactions: {
    expenses: string;
    incomes: string;
  };
}
