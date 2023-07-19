import usePredictions from '@/hooks/usePrediction';
import axios from 'axios';
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
  const { mutate: mutatePrediction } = usePredictions();

  async function deleteExpenseOrIncome() {
    await axios.delete(
      `/api/${type.startsWith('fixed') ? 'fixed-' : ''}transactions`,
      { params: { id, type } }
    );
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
          className="cursor-pointer text-indigo-400"
          size={22}
          onClick={deleteExpenseOrIncome}
        />
      </div>
    </div>
  );
}
