'use client';
import Balance from '@/components/Balance';
import Button from '@/components/Button';
import DefaultBackground from '@/components/DefaultBackground';
import Header from '@/components/Header';
import Language from '@/components/Language';
import Loading from '@/components/Loading';
import ModalError from '@/components/ModalError';
import Transactions from '@/components/Transactions';
import '@/i18n/i18n';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';

export default function Home() {
  const { push } = useRouter();
  const { t } = useTranslation();
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
        <Header />
        <Balance />
        <Transactions />
        <Button
          height="h-12"
          width="w-[350px] md:w-[700px]"
          translation={t('button:newTransaction')}
          onClick={() => push('/new-transaction/0')}
        />
        <Language />
      </DefaultBackground>
    </RecoilRoot>
  );
}
