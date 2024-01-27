'use client';
import DefaultBackground from '@/components/DefaultBackground';
import Loading from '@/components/Loading';
import Login from '@/components/Login';
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
