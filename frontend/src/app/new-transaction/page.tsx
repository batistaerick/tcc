'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import dynamic from 'next/dynamic';

const NewTransactionComponent = dynamic(
  () => import('@/components/NewTransaction')
);

export default function Transaction() {
  return (
    <DefaultBackground>
      <NewTransactionComponent />
      <ModalError />
    </DefaultBackground>
  );
}
