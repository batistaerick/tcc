export function typeChecker(type: string, isFixed: boolean) {
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
