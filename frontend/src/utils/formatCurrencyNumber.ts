export function formatCurrency(
  value: number | undefined,
  language: string
): string | undefined {
  const location: string = language === 'en' ? 'en-US' : 'pt-BR';
  const currency: string = language === 'en' ? 'USD' : 'BRL';

  return value?.toLocaleString(location, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  });
}

export function formatDate(date: Date, language: string): string {
  const location: 'en-US' | 'pt-BR' = language === 'en' ? 'en-US' : 'pt-BR';
  return new Date(date).toLocaleDateString(location, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
