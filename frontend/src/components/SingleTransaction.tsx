import FinancialMovements from '@/components/FinancialMovements';
import { Transaction } from '@/types/types';
import { useTranslation } from 'react-i18next';
import { KeyedMutator } from 'swr';

interface SingleTransactionProps {
  transactions: Transaction[] | undefined;
  transactionsMutate: KeyedMutator<Transaction[]>;
  fixedTransactions: Transaction[] | undefined;
  fixedTransactionsMutate: KeyedMutator<Transaction[]>;
  textColor: string;
}

export default function SingleTransaction({
  transactions,
  transactionsMutate,
  fixedTransactions,
  fixedTransactionsMutate,
  textColor,
}: Readonly<SingleTransactionProps>) {
  const { t } = useTranslation();
  return (
    <div className="w-11/12 rounded-xl border-2 border-gray-400 bg-stone-100 dark:border-none dark:bg-blue-950">
      <div
        className={`flex items-center justify-center font-semibold ${textColor}`}
      >
        {t('transactions:incomes')}
      </div>
      <div className="h-56 overflow-y-auto">
        {transactions?.map((transaction) => (
          <FinancialMovements
            key={transaction.id}
            transaction={transaction}
            mutateOnDelete={transactionsMutate}
          />
        ))}
        {fixedTransactions?.map((transaction) => (
          <FinancialMovements
            key={transaction.id}
            transaction={transaction}
            mutateOnDelete={fixedTransactionsMutate}
          />
        ))}
      </div>
    </div>
  );
}
