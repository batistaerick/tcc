'use client';
import Balance from '@/components/Balance';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Prediction from '@/components/Prediction';
import Transactions from '@/components/Transactions';
import '@/i18n/i18n';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoMdAddCircle } from 'react-icons/io';
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
      <div className="flex h-screen flex-col dark:bg-zinc-900 dark:text-gray-300">
        <Header />
        <Balance />
        <Prediction />
        <Transactions />
        <IoMdAddCircle
          className="fixed bottom-4 right-0 cursor-pointer p-3 text-indigo-800"
          size={75}
          onClick={() => push('/transactions')}
        />
      </div>
    </RecoilRoot>
  );
}
