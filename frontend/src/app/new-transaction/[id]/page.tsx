'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import dynamic from 'next/dynamic';

interface EditTransactionProps {
  params: { id: string };
}

export default function EditTransaction({
  params: { id },
}: Readonly<EditTransactionProps>) {
  const NewTransactionComponent = dynamic(
    () => import('@/components/NewTransaction')
  );

  return (
    <DefaultBackground>
      <NewTransactionComponent id={id} />
      <ModalError />
    </DefaultBackground>
  );
}
