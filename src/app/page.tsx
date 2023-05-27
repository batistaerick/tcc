'use client';
import AddButton from '@/components/AddButton';
import Balance from '@/components/Balance';
import Expenses from '@/components/Expenses';
import Header from '@/components/Header';
import Income from '@/components/Income';
import SpendStatus from '@/components/SpendStatus';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
    <div className="flex flex-col h-screen dark:bg-dark-theme dark:text-gray-300">
      <Header />
      <Balance />
      <SpendStatus />
      <Expenses />
      <Income />
      <AddButton />
    </div>
  );
}
