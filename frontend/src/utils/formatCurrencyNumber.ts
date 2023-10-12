export default function formatCurrency(
  value: number | undefined,
  language: string
) {
  const location = language === 'en' ? 'en-US' : 'pt-BR';
  const currency = language === 'en' ? 'USD' : 'BRL';

  return value?.toLocaleString(location, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  });
}
