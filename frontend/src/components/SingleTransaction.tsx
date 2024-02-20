import FinancialMovements from '@/components/FinancialMovements';
import { PaginatedTransactions, Transaction } from '@/types/types';
import { UIEvent } from 'react';
import { InfiniteKeyedMutator, KeyedMutator } from 'swr';

interface SingleTransactionProps {
  transactions: Transaction[] | undefined;
  transactionsMutate: InfiniteKeyedMutator<PaginatedTransactions[]>;
  fixedTransactions: Transaction[] | undefined;
  fixedTransactionsMutate: KeyedMutator<Transaction[]>;
  title: string;
  style: string;
  size: number;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<PaginatedTransactions[] | undefined>;
  length?: number;
}

export default function SingleTransaction({
  transactions,
  transactionsMutate,
  fixedTransactions,
  fixedTransactionsMutate,
  title,
  style,
  size,
  setSize,
  length,
}: Readonly<SingleTransactionProps>) {
  function onScroll(test: UIEvent<HTMLDivElement>) {
    if (
      test.currentTarget &&
      test.currentTarget.scrollHeight - test.currentTarget.scrollTop ===
        test.currentTarget.clientHeight
    ) {
      if (!!length && length >= size) {
        setSize((prevSize) => prevSize + 1);
      }
    }
  }

  return (
    <div className="w-10/12 rounded-xl bg-blue-950 bg-opacity-65">
      <div
        className={`flex items-center justify-center font-semibold ${style}`}
      >
        {title}
      </div>
      <div className="h-56 overflow-y-auto" onScroll={onScroll}>
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
