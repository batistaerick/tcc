'use client';
import Loading from '@/components/Loading';
import NewTransaction from '@/components/NewTransaction';
import '@/i18n/i18n';
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
      <div className="h-screen w-screen bg-slate-800">
        <NewTransaction
          transaction={{
            id: '',
            user: undefined,
            value: undefined,
            category: '',
            notes: '',
            date: new Date(),
            transactionType: undefined,
          }}
        />
      </div>
    </RecoilRoot>
  );
}
