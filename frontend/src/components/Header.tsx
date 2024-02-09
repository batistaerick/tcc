'use client';
import DatePickerDialog from '@/components/DatePickerDialog';
import Language from '@/components/Language';
import ThemeSwitch from '@/components/ThemeSwitch';
import useProfileImage from '@/hooks/useProfileImage';
import { selectedDateAtom } from '@/recoil/recoilValues';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BiUserCircle } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi';
import { useRecoilState } from 'recoil';

export default function Header() {
  const { push } = useRouter();
  const { data: profileImage } = useProfileImage();
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <header className="flex h-12 w-11/12 items-center justify-between">
      <div className="flex items-center gap-2">
        <Language />
        <ThemeSwitch />
      </div>
      <div className="flex items-center justify-center gap-2">
        <FcCalendar size={25} />
        <DatePickerDialog
          date={selectedDate}
          setDate={setSelectedDate}
          dateFormat="MMM/yyyy"
          showMonthYearPicker
        />
      </div>
      <div className="flex items-center gap-3">
        {profileImage && (
          <Image
            className="flex h-9 w-9 cursor-pointer items-center rounded-md object-cover"
            src={URL.createObjectURL(profileImage)}
            alt=""
            height={0}
            width={0}
            onClick={() => push('/account')}
          />
        )}
        {!profileImage && (
          <BiUserCircle
            className="cursor-pointer text-white"
            size={30}
            onClick={() => push('/account')}
          />
        )}
        <FiLogOut
          className="cursor-pointer text-slate-500"
          size={30}
          onClick={handleSignOut}
        />
      </div>
    </header>
  );
}
