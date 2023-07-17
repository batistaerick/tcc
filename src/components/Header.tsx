'use client';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { useRecoilState } from 'recoil';
import DatePickerDialog from './DatePickerDialog';
import DropdownMenu from './DropdownMenu';
import Language from './Language';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);

  return (
    <header className="flex h-12 w-[350px] items-center justify-between md:w-[700px]">
      <div className="flex items-center gap-2">
        <FcCalendar size={25} />
        <DatePickerDialog
          date={selectedDate}
          setDate={setSelectedDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <div className="flex items-center gap-2">
        <Language />
        <BiUserCircle
          className="cursor-pointer text-white"
          size={25}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        <div className="flex justify-end">
          <DropdownMenu isOpen={isDropdownOpen} />
        </div>
      </div>
    </header>
  );
}
