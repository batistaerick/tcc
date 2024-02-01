import DatePickerCustomButton from '@/components/DatePickerCustomButton';
import { enUS, ptBR } from 'date-fns/locale';
import { Dispatch, SetStateAction, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { SetterOrUpdater } from 'recoil';

export interface DatePickerDialogProps {
  date: Date;
  setDate: SetterOrUpdater<Date> | Dispatch<SetStateAction<Date>>;
  dateFormat?: string;
  showMonthYearPicker?: boolean;
}

export default function DatePickerDialog({
  date,
  setDate,
  dateFormat,
  showMonthYearPicker,
}: Readonly<DatePickerDialogProps>) {
  const {
    i18n: { language },
  } = useTranslation();
  const locale = useMemo(() => (language === 'en' ? enUS : ptBR), [language]);

  return (
    <DatePicker
      selected={date}
      onChange={(newDate: Date) => setDate(newDate)}
      dateFormat={dateFormat ?? 'dd/MMMM/yyyy'}
      showMonthYearPicker={showMonthYearPicker}
      customInput={<DatePickerCustomButton />}
      locale={locale}
    />
  );
}
