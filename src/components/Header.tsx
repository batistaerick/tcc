'use client';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { useRecoilState } from 'recoil';
import DatePickerDialog from './DatePickerDialog';
import DropdownMenu from './DropdownMenu';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);

  return (
    <header
      className={`
        sticky h-12 w-full px-5
        flex justify-between items-center
      `}
    >
      <div className="flex items-center gap-2">
        <FcCalendar size={25} />
        <DatePickerDialog date={selectedDate} setDate={setSelectedDate} />
      </div>
      <div className="flex">
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
