'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SetterOrUpdater } from 'recoil';

interface DatePickerDialogProps {
  date: Date;
  setDate: SetterOrUpdater<Date> | Dispatch<SetStateAction<Date>>;
}

export default function DatePickerDialog({
  date,
  setDate,
}: DatePickerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    setIsOpen(false);
  };

  return (
    <div className="flex gap-1 justify-center items-center">
      <DatePicker
        className="custom-datepicker"
        selected={date}
        onChange={handleDateChange}
        dateFormat="dd/MMMM/yyyy"
        showPopperArrow={false}
        open={isOpen}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        customInput={
          <input
            className="w-32 text-white bg-inherit focus:outline-none focus:ring-transparent"
            value={date?.toString() ?? ''}
            readOnly
          />
        }
      />
    </div>
  );
}
