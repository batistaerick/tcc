import Money from '@/components/Money';
import usePredictions from '@/hooks/usePrediction';
import { deleteFetcher } from '@/libs/fetchers';
import { Transaction } from '@/types/types';
import { formatDate } from '@/utils/globalFormats';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import { FcFullTrash } from 'react-icons/fc';
import { KeyedMutator } from 'swr';

export interface FinancialMovementsProps {
  transaction: Transaction;
  mutateOnDelete: KeyedMutator<Transaction[]>;
}

export default function FinancialMovements({
  transaction,
  mutateOnDelete,
}: Readonly<FinancialMovementsProps>) {
  const {
    i18n: { language },
  } = useTranslation();
  const { data: session } = useSession();
  const { mutate: mutatePrediction } = usePredictions();
  const { push } = useRouter();

  async function deleteTransaction(): Promise<void> {
    const config = buildHeadersAuthorization(session?.user.accessToken);
    await deleteFetcher(`/transactions/${transaction.id}`, config);
    await mutateOnDelete();
    await mutatePrediction();
  }

  return (
    <div className="mx-5 my-5 grid grid-cols-3 border-b-2 border-gray-500 text-lg">
      <div className="flex items-center justify-start gap-2">
        <BiEdit
          className={`
            cursor-pointer text-slate-800 transition-colors
            duration-500 hover:text-slate-500
            dark:text-slate-400 dark:hover:text-slate-100
          `}
          size={22}
          onClick={() => push(`/new-transaction/${transaction.id}`)}
        />
        {transaction.category}
      </div>
      <div className="flex items-center justify-center">
        {formatDate(transaction.date, language)}
      </div>
      <div className="flex items-end justify-end gap-1">
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
