import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const STYLE_LIST =
  'cursor-pointer block px-4 py-2 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600';

interface DropdownMenuProps {
  isOpen: boolean;
}

export default function DropdownMenu({ isOpen }: DropdownMenuProps) {
  const { push } = useRouter();

  function handleSignOut() {
    signOut().catch((error) => console.error(error));
  }

  return (
    <div
      className={`
        ${isOpen ? 'absolute' : 'hidden'}
        z-10 mt-9 w-28 divide-y divide-gray-100
        rounded-lg bg-white shadow dark:bg-gray-800
      `}
    >
      <ul className="py-2 text-sm">
        <li className={STYLE_LIST} onClick={() => push('/account')}>
          Account
        </li>
        <li className={STYLE_LIST} onClick={() => push('/settings')}>
          Settings
        </li>
        <li className={STYLE_LIST} onClick={handleSignOut}>
          Sign out
        </li>
      </ul>
    </div>
  );
}
