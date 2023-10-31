import useProfileImage from '@/hooks/useProfileImage';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import Image from 'next/image';
import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { useRecoilState } from 'recoil';
import DatePickerDialog from './DatePickerDialog';
import DropdownMenu from './DropdownMenu';
import Language from './Language';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: profileImage } = useProfileImage();
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);

  return (
    <header className="flex h-12 w-[350px] items-center justify-between md:w-[700px]">
      <div className="flex items-center gap-2">
        <FcCalendar size={27} />
        <DatePickerDialog
          date={selectedDate}
          setDate={setSelectedDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <div className="flex items-center gap-2">
        <Language />
        {profileImage && (
          <Image
            className="flex h-7 w-7 cursor-pointer items-center rounded-md object-cover"
            src={URL.createObjectURL(profileImage)}
            alt=""
            height={0}
            width={0}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        )}
        {!profileImage && (
          <BiUserCircle
            className="cursor-pointer text-white"
            size={27}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        )}
        <div className="flex justify-end">
          <DropdownMenu isOpen={isDropdownOpen} />
        </div>
      </div>
    </header>
  );
}
