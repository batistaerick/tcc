'use client';
import AddButton from '@/components/AddButton';
import Balance from '@/components/Balance';
import Header from '@/components/Header';
import SpendStatus from '@/components/SpendStatus';
import Transactions from '@/components/Transactions';
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
    return <></>;
  }

  return (
    <RecoilRoot>
      <div className="flex flex-col h-screen dark:bg-dark-theme dark:text-gray-300">
        <Header />
        <Balance />
        <SpendStatus />
        <Transactions />
        <AddButton />
      </div>
    </RecoilRoot>
  );
}
