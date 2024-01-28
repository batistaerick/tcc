'use client';
import DefaultBackground from '@/components/DefaultBackground/DefaultBackground';
import Loading from '@/components/Loading/Loading';
import ModalError from '@/components/ModalError/ModalError';
import NewTransaction from '@/components/NewTransaction/NewTransaction';
import useTransaction from '@/hooks/useTransaction';
import '@/i18n/i18n';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

interface NewTransactionProps {
  params: { id: string };
}

export default function Transactions({
  params: { id },
}: Readonly<NewTransactionProps>) {
  const { push } = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      push('/auth');
    },
  });
  const { data, mutate } = useTransaction(id);

  if (status === 'loading') {
    return <Loading />;
  }
  return (
    <RecoilRoot>
      <ModalError />
      <DefaultBackground>
        <NewTransaction
          transaction={{
            id: data?.id ?? '',
            user: data?.user ?? undefined,
            value: data?.value ?? undefined,
            category: data?.category ?? '',
            notes: data?.notes ?? '',
            date: new Date(data?.date ?? new Date()),
            transactionType: data?.transactionType ?? undefined,
          }}
          mutation={mutate}
        />
      </DefaultBackground>
    </RecoilRoot>
  );
}