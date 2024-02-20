'use client';
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import ModalError from '@/components/Modals/ModalError';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Auth() {
  const { push } = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      push('/');
    }
  });

  if (status === 'loading' || status === 'authenticated') {
    return <Loading />;
  }

  return (
    <>
      <Login />
      <ModalError />
    </>
  );
}
