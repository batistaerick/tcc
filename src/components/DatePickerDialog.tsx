'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SetterOrUpdater } from 'recoil';

interface DatePickerDialogProps {
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
}: DatePickerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    setIsOpen(false);
  };

  return (
    <DatePicker
      className="custom-datepicker"
      selected={date}
      onChange={handleDateChange}
      dateFormat={dateFormat ?? 'dd/MMMM/yyyy'}
      showPopperArrow={false}
      showMonthYearPicker={showMonthYearPicker}
      open={isOpen}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      customInput={
        <input
          className="w-32 bg-inherit text-white focus:outline-none focus:ring-transparent"
          value={date?.toString() ?? ''}
          readOnly
        />
      }
    />
  );
}
