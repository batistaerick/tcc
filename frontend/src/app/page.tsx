'use client';
import Balance from '@/components/Balance';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Transactions from '@/components/Transactions';
import Wrapper from '@/components/Wrapper';
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
        width="w-10/12"
        translation={t('button:newTransaction')}
        onClick={() => push('/new-transaction')}
      />
    </Wrapper>
  );
}
