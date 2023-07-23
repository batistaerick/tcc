'use client';
import Loading from '@/components/Loading';
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
      <div className="h-screen w-screen bg-slate-800">
        <Profile />
      </div>
    </RecoilRoot>
  );
}
