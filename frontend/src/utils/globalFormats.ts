export function formatCurrency(
  value: number | undefined,
  language: string
): string | undefined {
  return value?.toLocaleString(getLocation(language), {
    currency: getCurrency(language),
    minimumFractionDigits: 2,
    style: 'currency',
  });
}

export function formatDate(date: Date, language: string): string {
  return new Date(date).toLocaleDateString(getLocation(language), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function getLocation(language: string): 'en-US' | 'pt-BR' {
  return language === 'en' ? 'en-US' : 'pt-BR';
}

export function getCurrency(language: string): 'USD' | 'BRL' {
  return language === 'en' ? 'USD' : 'BRL';
}
