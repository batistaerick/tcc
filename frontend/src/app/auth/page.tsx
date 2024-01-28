'use client';
import DefaultBackground from '@/components/DefaultBackground/DefaultBackground';
import Loading from '@/components/Loading/Loading';
import Login from '@/components/Login/Login';
import '@/i18n/i18n';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const { status } = useSession();
  const { push } = useRouter();

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'authenticated') {
    push('/');
    return <Loading />;
  }
  return (
    <DefaultBackground>
      <Login />
    </DefaultBackground>
  );
}
