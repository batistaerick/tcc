import DatePickerDialog from '@/components/DatePickerDialog';
import Dropdown from '@/components/Dropdown';
import useProfileImage from '@/hooks/useProfileImage';
import { newTransactionAtom, selectedDateAtom } from '@/recoil/recoilValues';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BiUserCircle } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { GoGoal } from 'react-icons/go';
import { GrTransaction } from 'react-icons/gr';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { VscAccount, VscHome } from 'react-icons/vsc';
import { useRecoilState, useSetRecoilState } from 'recoil';

function createDropdownItem(
  icon: JSX.Element,
  text: string,
  onClick: () => void | Promise<void>
) {
  return {
    label: (
      <div className="flex items-center gap-2">
        {icon}
        {text}
      </div>
    ),
    onClick,
  };
}

interface HeaderProps {
  dateFormat?: string;
}

export default function Header({ dateFormat }: Readonly<HeaderProps>) {
  const { push } = useRouter();
  const { data: profileImage } = useProfileImage();
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);
  const setIsNewTransactionOpen = useSetRecoilState(newTransactionAtom);

  async function handleSignOut(): Promise<void> {
    await signOut();
  }

  const dropdownItems = [
    createDropdownItem(<VscHome />, 'Home', () => push('/')),
    createDropdownItem(<GrTransaction />, 'New Transaction', () =>
      setIsNewTransactionOpen((prev) => !prev)
    ),
    createDropdownItem(<TbBrandGoogleAnalytics />, 'Analytics', () =>
      push('/analytics')
    ),
    createDropdownItem(<VscAccount />, 'Account', () => push('/account')),
    createDropdownItem(<GoGoal />, 'Goals', () => push('/goals')),
    createDropdownItem(<FiLogOut />, 'Sign Out', handleSignOut),
  ];

  return (
    <header className="flex w-[95%] items-center justify-between gap-3">
      <Dropdown dropdownItems={dropdownItems} />
      <DatePickerDialog
        date={selectedDate}
        setDate={setSelectedDate}
        dateFormat={dateFormat}
        showMonthYearPicker
      />
      <div className="flex items-end gap-2">
        {profileImage && (
          <Image
            className="flex h-11 w-11 items-center rounded-full object-cover"
            src={URL.createObjectURL(profileImage)}
            alt=""
            height={0}
            width={0}
          />
        )}
        {!profileImage && <BiUserCircle className="text-white" size={30} />}
      </div>
    </header>
  );
}
