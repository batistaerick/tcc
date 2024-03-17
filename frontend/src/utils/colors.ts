export function getProgressColor(value: number) {
  if (value <= 0) return 'red';
  if (value > 0 && value <= 20) return 'rose';
  if (value > 20 && value <= 40) return 'blue';
  if (value > 40 && value <= 60) return 'emerald';
  if (value > 60 && value <= 80) return 'lime';
  if (value > 80 && value <= 100) return 'green';
  return 'green';
}

export const incomeColors = [
  'lime',
  'emerald',
  'green',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
];

export const expenseColors = [
  'red',
  'pink',
  'amber',
  'gray',
  'fuchsia',
  'zinc',
  'orange',
  'rose',
  'yellow',
  'slate',
];
