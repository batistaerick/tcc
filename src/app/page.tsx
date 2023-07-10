'use client';
import Balance from '@/components/Balance';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
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
      <div
        className={`
          flex h-screen flex-col gap-2 bg-white
          dark:bg-zinc-900 dark:text-gray-300
        `}
      >
        <Header />
        <Balance />
        <Transactions />
        <IoMdAddCircle
          className="fixed bottom-0 right-0 m-3 cursor-pointer text-indigo-800"
          size={45}
          onClick={() => push('/transactions')}
        />
      </div>
    </RecoilRoot>
  );
}
