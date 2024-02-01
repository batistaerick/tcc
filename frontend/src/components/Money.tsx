import { formatCurrency } from '@/utils/globalFormats';
import { useTranslation } from 'react-i18next';

export interface MoneyProps {
  className?: string;
  value?: number;
}

export default function Money({ className, value }: Readonly<MoneyProps>) {
  const {
    i18n: { language },
  } = useTranslation();
  return <div className={className}>{formatCurrency(value, language)}</div>;
}
