'use client';
import Loading from '@/components/Loading';
import NewTransaction from '@/components/NewTransaction';
import useTransaction from '@/hooks/useTransaction';
import '@/i18n/i18n';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

interface NewTransactionProps {
  params: { id: string };
}

export default function Transactions({
  params,
}: Readonly<NewTransactionProps>) {
  const { push } = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      push('/auth');
    },
  });
  const { data, mutate } = useTransaction(params.id);

  if (status === 'loading') {
    return <Loading />;
  }
  return (
    <RecoilRoot>
      <div className="h-screen w-screen bg-slate-800">
        {data && (
          <NewTransaction
            transaction={{
              id: data.id,
              user: data.user,
              value: data.value,
              category: data.category,
              notes: data.notes,
              date: new Date(data.date ?? new Date()),
              transactionType: data.transactionType,
            }}
            mutation={mutate}
          />
        )}
      </div>
    </RecoilRoot>
  );
}
