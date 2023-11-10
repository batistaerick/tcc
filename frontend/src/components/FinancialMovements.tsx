import usePredictions from '@/hooks/usePrediction';
import { deleteFetcher } from '@/libs/fetchers';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import { BiEdit } from 'react-icons/bi';
import { FcFullTrash } from 'react-icons/fc';
import { KeyedMutator } from 'swr';
import Money from './Money';

interface FinancialMovementsProps {
  transaction: Transaction;
  mutateOnDelete: KeyedMutator<any>;
}

export default function FinancialMovements({
  transaction,
  mutateOnDelete,
}: Readonly<FinancialMovementsProps>) {
  const { data: session } = useSession();
  const { mutate: mutatePrediction } = usePredictions();

  async function deleteTransaction() {
    const config = buildHeadersAuthorization(session?.user.accessToken);
    await deleteFetcher(`/transactions/${transaction.id}`, config);
    await mutateOnDelete();
    await mutatePrediction();
  }

  function formatDate() {
    const date: Date = new Date(transaction?.date ?? new Date());
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  return (
    <div className="mx-5 my-5 flex items-center justify-between border-b-2 border-gray-500 text-lg">
      <div className="flex items-center justify-center gap-2">
        <BiEdit className="cursor-pointer text-slate-500" size={22} />
        {transaction.category}
      </div>
      <div>{formatDate()}</div>
      <div className="flex items-center justify-center gap-1">
        <Money value={transaction?.value} />
        <FcFullTrash
          data-testid="delete-icon"
          className="cursor-pointer"
          size={22}
          onClick={deleteTransaction}
        />
      </div>
    </div>
  );
}
