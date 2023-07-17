'use client';
import Balance from '@/components/Balance';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Transactions from '@/components/Transactions';
import '@/i18n/i18n';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';

export default function Home() {
  const { push } = useRouter();
  const { t } = useTranslation();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      push('/auth');
    },
  });

  if (status === 'loading') {
    return <Loading />;
  }
  return (
    <RecoilRoot>
      <div
        className={`
          flex h-screen w-screen flex-col items-center
          gap-2 bg-white dark:bg-zinc-900 dark:text-gray-300
        `}
      >
        <Header />
        <Balance />
        <Transactions />
        <Button
          height="h-12"
          width="w-[350px] md:w-[700px]"
          translation={t('addButton:addTransaction')}
          onClick={() => push('new-transaction')}
        />
      </div>
    </RecoilRoot>
  );
}
