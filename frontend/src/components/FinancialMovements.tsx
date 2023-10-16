import usePredictions from '@/hooks/usePrediction';
import { deleteFetcher } from '@/libs/fetchers';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import { FcFullTrash } from 'react-icons/fc';
import { KeyedMutator } from 'swr';
import Money from './Money';

interface FinancialMovementsProps {
  id: string;
  category: string;
  amount: number;
  type: string;
  mutateOnDelete: KeyedMutator<any>;
}

export default function FinancialMovements({
  id,
  category,
  amount,
  type,
  mutateOnDelete,
}: FinancialMovementsProps) {
  const { data: session } = useSession();
  const { mutate: mutatePrediction } = usePredictions();

  async function deleteTransaction() {
    const config = buildHeadersAuthorization(session?.user.accessToken);
    await deleteFetcher(`/transactions/${id}`, config);
    await mutateOnDelete();
    await mutatePrediction();
  }

  return (
    <div className="mx-5 my-5 flex items-center justify-between border-b-2 border-gray-500 text-lg">
      {category}
      <div className="flex items-center justify-center gap-1">
        <Money value={amount ?? 0} />
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
