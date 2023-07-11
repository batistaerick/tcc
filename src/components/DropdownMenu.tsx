import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const STYLE_LIST =
  'cursor-pointer block px-4 py-2 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600';

interface DropdownMenuProps {
  isOpen: boolean;
}

export default function DropdownMenu({ isOpen }: DropdownMenuProps) {
  const { t } = useTranslation();
  const { push } = useRouter();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div
      className={`
        ${isOpen ? 'absolute' : 'hidden'}
        z-10 mt-8 w-28 divide-y divide-gray-100
        rounded-lg bg-white shadow dark:bg-gray-800
      `}
    >
      <ul className="py-2 text-sm">
        <li className={STYLE_LIST} onClick={() => push('/account')}>
          {t('dropdownMenu:account')}
        </li>
        <li className={STYLE_LIST} onClick={() => push('/settings')}>
          {t('dropdownMenu:settings')}
        </li>
        <li className={STYLE_LIST} onClick={handleSignOut}>
          {t('dropdownMenu:signOut')}
        </li>
      </ul>
    </div>
  );
}
