import { LanguageMap } from '@/i18n/types';

const en: LanguageMap = {
  api: {
    differentPasswords: 'Passwords must be the same.',
    invalidUsername:
      'Username must be maximum 30 characters and can only contain letters, digits, hyphens, and underscores.',
    missingCredentials: 'Please provide both your email and password.',
    wrongCredentials:
      'Invalid credentials. Please double-check your email and password and try again.',
    existingEmail:
      'The email you provided is already registered. Please use a different email address to sign up or try logging in.',
    invalidPassword:
      'Password must have at least seven characters, one number, one uppercase/lowercase letter and one special character.',
    error: 'Error',
  },
  account: {
    firstName: 'First Name',
    lastName: 'Last Name',
    middleName: 'Middle Name',
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
    firstName: 'First Name',
  },
  balance: {
    currentlyAmount: 'Currently Amount',
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
