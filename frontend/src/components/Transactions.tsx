import FinancialMovements from '@/components/FinancialMovements';
import { PaginatedTransactions, Transaction } from '@/types/types';
import { UIEvent, useEffect, useRef } from 'react';
import { InfiniteKeyedMutator, KeyedMutator } from 'swr';

interface SingleTransactionProps {
  transactions: Transaction[] | undefined;
  transactionsMutate: InfiniteKeyedMutator<PaginatedTransactions[]>;
  fixedTransactions: Transaction[] | undefined;
  fixedTransactionsMutate: KeyedMutator<Transaction[]>;
  title: string;
  size: number;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<PaginatedTransactions[] | undefined>;
  length?: number;
}

export default function Transactions({
  transactions,
  transactionsMutate,
  fixedTransactions,
  fixedTransactionsMutate,
  title,
  size,
  setSize,
  length,
}: Readonly<SingleTransactionProps>) {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  function onScroll(event: UIEvent<HTMLDivElement>) {
    if (
      event.currentTarget &&
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
        event.currentTarget.clientHeight
    ) {
      if (!!length && length >= size) {
        setSize((prevSize) => prevSize + 1);
      }
    }
  }

  useEffect(() => {
    if (scrollDivRef.current) {
      const { scrollHeight, clientHeight } = scrollDivRef.current;
      if (scrollHeight === clientHeight) {
        setSize((prevSize) => prevSize + 1);
      }
    }
  }, [setSize, scrollDivRef]);

  return (
    <div className="w-10/12 rounded-xl bg-blue-950 bg-opacity-65">
      <div className="mx-3">
        <div className="w-full">
          <div className="my-2 grid grid-cols-3 text-lg">
            <div className="flex items-center">{title}</div>
            <div className="flex items-center justify-center">Date</div>
            <div className="flex items-center justify-end">Value</div>
          </div>
          <div
            className="h-56 space-y-2 overflow-y-auto"
            onScroll={onScroll}
            ref={scrollDivRef}
          >
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
      </div>
    </div>
  );
}
