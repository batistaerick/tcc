'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcCalendar, FcReadingEbook } from 'react-icons/fc';
import { GiWallet } from 'react-icons/gi';
import DropdownMenu from './DropdownMenu';

export default function Header() {
  const { push } = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header
      className={`
        sticky h-12 w-full px-5
        flex justify-between items-center
      `}
    >
      <GiWallet
        className="cursor-pointer"
        onClick={() => push('/')}
        size={25}
      />
      <div className="flex items-center gap-2">
        <FcCalendar size={20} />
        Jan/2023
      </div>
      <div className="flex">
        <FcReadingEbook
          className="cursor-pointer border border-gray-300 rounded-full"
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
