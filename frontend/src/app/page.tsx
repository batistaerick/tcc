'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { push } = useRouter();
  const { t } = useTranslation();

  const DynamicHeader = dynamic(() => import('@/components/Header'), {
    loading: () => <header className="h-12 w-10/12 rounded-xl" />,
  });
  const DynamicBalance = dynamic(() => import('@/components/Balance'), {
    loading: () => (
      <div className="h-52 w-10/12 cursor-default rounded-xl bg-slate-700 bg-opacity-60" />
    ),
  });
  const DynamicTransactions = dynamic(
    () => import('@/components/Transactions'),
    {
      loading: () => (
        <div className="h-[252px] w-10/12 rounded-xl bg-blue-950 bg-opacity-65" />
      ),
    }
  );
  const DynamicButton = dynamic(() => import('@/components/Button'));

  return (
    <DefaultBackground>
      <div className="w-10/12">
        <DynamicHeader dateFormat="MMM/yyyy" />
      </div>
      <DynamicBalance />
      <DynamicTransactions />
      <DynamicButton
        height="h-12"
        width="w-10/12"
        translation={t('button:newTransaction')}
        onClick={() => push('/new-transaction')}
      />
      <ModalError />
    </DefaultBackground>
  );
}
