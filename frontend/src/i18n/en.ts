import { LanguageMap } from './types';

const en: LanguageMap = {
  api: {
    differentPasswords: 'Passwords must be the same.',
    invalidUsername:
      'Username must be maximum 30 characters and can only contain letters, digits, hyphens, and underscores.',
    missingCredentials: 'Please provide both your email and password.',
    wrongCredentials:
      'Invalid credentials. Please double-check your email and password and try again.',
  },
  account: {
    username: 'Username',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
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
  button: {
    newTransaction: 'New Transaction',
  },
  categoryOption: {
    chooseCategory: 'Choose a category',
  },
  dropdownMenu: {
    account: 'Account',
    signOut: 'Sign out',
  },
  newTransaction: {
    value: 'Value',
    cancel: 'Cancel',
    category: 'Category',
    expenseOption: 'Expense',
    incomeOption: 'Income',
    fixedExpenseOption: 'Fixed Expense',
    fixedIncomeOption: 'Fixed Income',
    chooseType: 'Select a type',
    transactionType: 'Select the transaction type',
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
