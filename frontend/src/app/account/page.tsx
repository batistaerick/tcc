'use client';
import DefaultBackground from '@/components/DefaultBackground/DefaultBackground';
import Loading from '@/components/Loading/Loading';
import ModalError from '@/components/ModalError/ModalError';
import Profile from '@/components/Profile/Profile';
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
