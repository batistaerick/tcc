'use client';
import Loading from '@/components/Loading';
import NewTransaction from '@/components/NewTransaction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

export default function Transactions() {
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
      <NewTransaction></NewTransaction>
    </RecoilRoot>
  );
}
