'use client';
import AddButton from '@/components/AddButton';
import Balance from '@/components/Balance';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Transactions from '@/components/Transactions';
import '@/i18n/i18n';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

export default function Home() {
  const { push } = useRouter();
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
          flex h-screen w-screen flex-col gap-2 bg-white
          dark:bg-zinc-900 dark:text-gray-300
        `}
      >
        <Header />
        <Balance />
        <Transactions />
        <AddButton />
      </div>
    </RecoilRoot>
  );
}
