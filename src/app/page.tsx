'use client';
import AddButton from '@/components/AddButton';
import Balance from '@/components/Balance';
import Header from '@/components/Header';
import Prediction from '@/components/Prediction';
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
    return <></>;
  }

  return (
    <RecoilRoot>
      <div className="flex h-screen flex-col dark:bg-zinc-900 dark:text-gray-300">
        <Header />
        <Balance />
        <Prediction />
        <Transactions />
        <AddButton />
      </div>
    </RecoilRoot>
  );
}
