import { LanguageMap } from './types';

const en: LanguageMap = {
  api: {
    authorize: {
      wrongCredentials:
        'Invalid email or password. Please make sure you have entered the correct credentials.',
    },
  },
  addButton: {
    addTransaction: 'Add Transaction',
  },
  auth: {
    alreadyHaveAccount: 'Already have an account?',
    email: 'Email',
    login: 'Login',
    newInHere: 'New in here?',
    password: 'Password',
    signIn: 'Sign in',
    signUp: 'Sign up',
    username: 'Username',
  },
  balance: {
    expense: 'Total Expense',
    income: 'Total Income',
    totalBalance: 'Total Balance',
  },
  categoryOption: {
    chooseCategory: 'Choose a category',
  },
  dropdownMenu: {
    account: 'Account',
    settings: 'Settings',
    signOut: 'Sign out',
  },
  newTransaction: {
    amount: 'Amount',
    cancel: 'Cancel',
    category: 'Category',
    expenseOption: 'Expense',
    fixed: 'Is it a fixed expense or income?',
    incomeOption: 'Income',
    notes: 'Notes (Optional)',
    save: 'Save',
  },
  prediction: 'Prediction',
  transactions: {
    expenses: 'Expenses',
    incomes: 'Incomes',
  },
};

export default en;
