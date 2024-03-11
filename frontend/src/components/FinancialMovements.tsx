import Money from '@/components/Money';
import usePredictions from '@/hooks/usePrediction';
import { deleteFetcher } from '@/libs/fetchers';
import { newTransactionAtom, transactionFormAtom } from '@/recoil/recoilValues';
import { PaginatedTransactions, Transaction } from '@/types/types';
import { formatDate } from '@/utils/globalFormats';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import { FcFullTrash } from 'react-icons/fc';
import { useSetRecoilState } from 'recoil';
import { InfiniteKeyedMutator, KeyedMutator } from 'swr';

export interface FinancialMovementsProps {
  transaction: Transaction;
  mutateOnDelete:
    | InfiniteKeyedMutator<PaginatedTransactions[]>
    | KeyedMutator<Transaction[]>;
}

export default function FinancialMovements({
  transaction,
  mutateOnDelete,
}: Readonly<FinancialMovementsProps>) {
  const setIsNewTransactionOpen = useSetRecoilState(newTransactionAtom);
  const setNewTransactionForm = useSetRecoilState(transactionFormAtom);
  const {
    i18n: { language },
  } = useTranslation();
  const { data: session } = useSession();
  const { mutate: mutatePrediction } = usePredictions();

  async function deleteTransaction(): Promise<void> {
    const config = buildHeadersAuthorization(session?.user.accessToken);
    await deleteFetcher(`/transactions/${transaction.id}`, config);
    await mutateOnDelete();
    await mutatePrediction();
  }

  function onEdit() {
    setNewTransactionForm(transaction);
    setIsNewTransactionOpen((prev) => !prev);
  }

  return (
    <div className="grid grid-cols-3 border-b-2 border-gray-500 text-lg">
      <div className="flex items-center justify-start gap-2">
        <BiEdit
          className="cursor-pointer text-slate-400 transition-colors duration-500 hover:text-slate-100"
          size={22}
          onClick={onEdit}
        />
        {transaction.category}
      </div>
      <div className="flex items-center justify-center">
        {transaction?.date && formatDate(transaction.date, language)}
      </div>
      <div className="flex items-center justify-end gap-1">
        <Money value={transaction.value} />
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
