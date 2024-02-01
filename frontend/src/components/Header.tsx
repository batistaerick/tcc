import DatePickerDialog from '@/components/DatePickerDialog';
import useProfileImage from '@/hooks/useProfileImage';
import { selectedDateAtom } from '@/recoil/recoilValues';
import { signOut } from 'next-auth/react';
import useTheme from 'next-theme';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BiUserCircle } from 'react-icons/bi';
import { FaSun } from 'react-icons/fa';
import { FcCalendar, FcSettings } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi';
import { GiMoonBats } from 'react-icons/gi';
import { useRecoilState } from 'recoil';

export default function Header() {
  const { push } = useRouter();
  const { data: profileImage } = useProfileImage();
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);
  const { setTheme, theme } = useTheme();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <header className="flex h-12 w-[350px] items-center justify-between md:w-[700px]">
      <div className="flex items-center gap-2">
        {profileImage && (
          <Image
            className="flex h-9 w-9 items-center rounded-md object-cover"
            src={URL.createObjectURL(profileImage)}
            alt=""
            height={0}
            width={0}
          />
        )}
        {!profileImage && <BiUserCircle className="text-white" size={30} />}
      </div>
      <div className="flex items-center justify-center gap-2">
        <FcCalendar size={25} />
        <DatePickerDialog
          date={selectedDate}
          setDate={setSelectedDate}
          dateFormat="MMMM/yyyy"
          showMonthYearPicker
        />
      </div>
      <div className="flex items-center gap-3">
        {theme === 'dark' ? (
          <FaSun
            className="cursor-pointer"
            color="orange"
            size={30}
            onClick={() => setTheme('light')}
          />
        ) : (
          <GiMoonBats
            className="cursor-pointer"
            size={30}
            onClick={() => setTheme('dark')}
          />
        )}
        <FcSettings
          className="cursor-pointer"
          size={30}
          onClick={() => push('/account')}
        />
        <FiLogOut
          className="cursor-pointer text-slate-500"
          size={30}
          onClick={handleSignOut}
        />
      </div>
    </header>
  );
}
