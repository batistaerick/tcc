'use client';
import DatePickerDialog from '@/components/DatePickerDialog';
import Language from '@/components/Language';
import useProfileImage from '@/hooks/useProfileImage';
import { selectedDateAtom } from '@/recoil/recoilValues';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BiUserCircle } from 'react-icons/bi';
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
    <header className="flex w-10/12 items-center justify-between gap-3 border-slate-600">
      {profileImage && (
        <Image
          className="flex h-12 w-12 cursor-pointer items-center rounded-md object-cover"
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
      <DatePickerDialog
        date={selectedDate}
        setDate={setSelectedDate}
        dateFormat="MMM/yyyy"
        showMonthYearPicker
      />
      <div className="flex items-center gap-2">
        <Language />
        <FiLogOut
          className="cursor-pointer text-slate-500"
          size={35}
          onClick={handleSignOut}
        />
      </div>
    </header>
  );
}
