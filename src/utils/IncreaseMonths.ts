export function addMonths(date: Date, numberOfMonths: number): Date {
  const newDate = new Date(date.getTime());

  const currentMonth = newDate.getMonth();
  const newMonth = currentMonth + numberOfMonths;

  const yearOffset = Math.floor(newMonth / 12);
  const remainingMonths = newMonth % 12;

  newDate.setMonth(remainingMonths);
  newDate.setFullYear(newDate.getFullYear() + yearOffset);

  return newDate;
}
