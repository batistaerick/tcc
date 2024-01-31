'use client';
import Balance from '@/components/Balance';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Language from '@/components/Language';
import Transactions from '@/components/Transactions';
import Wrapper from '@/components/Wrapper';
import '@/i18n/i18n';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { push } = useRouter();
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Header />
      <Balance />
      <Transactions />
      <Button
        height="h-12"
        width="w-[350px] md:w-[700px]"
        translation={t('button:newTransaction')}
        onClick={() => push('/new-transaction')}
      />
      <Language />
    </Wrapper>
  );
}
