'use client';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiUserCircle } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { SiMicrosofttranslator } from 'react-icons/si';
import { useRecoilState } from 'recoil';
import DatePickerDialog from './DatePickerDialog';
import DropdownMenu from './DropdownMenu';

export default function Header() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);

  function handleChangeLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  }

  return (
    <header
      className={`
        sticky flex h-12 w-full
        items-center justify-between px-5
      `}
    >
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
        <SiMicrosofttranslator
          className="cursor-pointer"
          size={20}
          onClick={handleChangeLanguage}
        />
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
