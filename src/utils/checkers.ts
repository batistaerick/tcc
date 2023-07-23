export function typeChecker(
  type: string,
  isFixed: boolean
): 'fixedExpenses' | 'expenses' | 'fixedIncomes' | 'incomes' {
  if (type === 'expense') {
    if (isFixed) {
      return 'fixedExpenses';
    }
    return 'expenses';
  }
  if (type === 'income') {
    if (isFixed) {
      return 'fixedIncomes';
    }
  }
  return 'incomes';
}

export function hasValueInside(data: object): boolean {
  return (Object.keys(data) as (keyof typeof data)[]).some((key) => {
    return (
      data[key] !== null &&
      data[key] !== undefined &&
      String(data[key]).length !== 0
    );
  });
}

export function arePasswordsEqual(
  newPassword: string | undefined,
  confirmPassword: string | undefined
): boolean {
  return newPassword === confirmPassword;
}
