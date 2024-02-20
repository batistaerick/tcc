'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { push } = useRouter();
  const { t } = useTranslation();

  const HeaderComponent = dynamic(() => import('@/components/Header'));
  const BalanceComponent = dynamic(() => import('@/components/Balance'));
  const TransactionsComponent = dynamic(
    () => import('@/components/Transactions')
  );
  const ButtonComponent = dynamic(() => import('@/components/Button'));

  return (
    <DefaultBackground>
      <div className="w-10/12">
        <HeaderComponent dateFormat="MMM/yyyy" />
      </div>
      <BalanceComponent />
      <TransactionsComponent />
      <ButtonComponent
        height="h-12"
        width="w-10/12"
        translation={t('button:newTransaction')}
        onClick={() => push('/new-transaction')}
      />
      <ModalError />
    </DefaultBackground>
  );
}
