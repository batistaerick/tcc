export interface LanguageMap {
  api: {
    authorize: {
      wrongCredentials: string;
    };
  };
  addButton: {
    addTransaction: string;
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
