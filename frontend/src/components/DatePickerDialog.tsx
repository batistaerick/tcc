import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SetterOrUpdater } from 'recoil';
import DatePickerCustomButton from './DatePickerCustomButton';

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
  return (
    <DatePicker
      selected={date}
      onChange={(newDate: Date) => setDate(newDate)}
      dateFormat={dateFormat ?? 'dd/MMMM/yyyy'}
      showMonthYearPicker={showMonthYearPicker}
      customInput={<DatePickerCustomButton />}
    />
  );
}
