import useCurrentUser from '@/hooks/useCurrentUser';
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
  const { data: user } = useCurrentUser();
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
        {user?.userImage?.image && (
          <Image
            className="flex h-7 w-7 cursor-pointer items-center rounded-md object-cover"
            src={user.userImage.image}
            alt=""
            height={0}
            width={0}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        )}
        {!user?.userImage?.image && (
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
