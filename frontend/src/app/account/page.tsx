'use client';
import DefaultBackground from '@/components/DefaultBackground';
import Loading from '@/components/Loading';
import ModalError from '@/components/ModalError';
import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

export default function Account() {
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
      <ModalError />
      <DefaultBackground>
        <Profile />
      </DefaultBackground>
    </RecoilRoot>
  );
}
