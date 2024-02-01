'use client';
import NewTransaction from '@/components/NewTransaction';
import Wrapper from '@/components/Wrapper';

interface EditTransactionProps {
  params: { id: string };
}

export default function EditTransaction({
  params: { id },
}: Readonly<EditTransactionProps>) {
  return (
    <Wrapper>
      <NewTransaction id={id} />
    </Wrapper>
  );
}
