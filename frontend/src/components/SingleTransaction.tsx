import FinancialMovements from '@/components/FinancialMovements';
import { Transaction } from '@/types/types';
import { KeyedMutator } from 'swr';

interface SingleTransactionProps {
  transactions: Transaction[] | undefined;
  transactionsMutate: KeyedMutator<Transaction[]>;
  fixedTransactions: Transaction[] | undefined;
  fixedTransactionsMutate: KeyedMutator<Transaction[]>;
  title: string;
  style: string;
}

export default function SingleTransaction({
  transactions,
  transactionsMutate,
  fixedTransactions,
  fixedTransactionsMutate,
  title,
  style,
}: Readonly<SingleTransactionProps>) {
  return (
    <div className="w-11/12 rounded-xl bg-[#b1bed5] dark:border-none dark:bg-blue-950">
      <div
        className={`flex items-center justify-center font-semibold ${style}`}
      >
        {title}
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
