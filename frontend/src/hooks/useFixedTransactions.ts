import { TransactionType } from '@/enums/enums';
import { getFetcher } from '@/libs/fetchers';
import { Transaction } from '@/types/types';
import useSWR, { SWRResponse } from 'swr';

export default function useFixedTransactions(
  transactionType: TransactionType
): SWRResponse<Transaction[], Error> {
  return useSWR(
    `/transactions/${transactionType}/fixed`,
    getFetcher<Transaction[]>
  );
}
