'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import dynamic from 'next/dynamic';

export default function Transaction() {
  const NewTransactionComponent = dynamic(
    () => import('@/components/NewTransaction')
  );
  return (
    <DefaultBackground>
      <NewTransactionComponent />
      <ModalError />
    </DefaultBackground>
  );
}
