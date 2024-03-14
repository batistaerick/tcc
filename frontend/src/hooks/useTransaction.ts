import { getFetcher } from '@/libs/fetchers';
import { Transaction } from '@/types/types';
import useSWR, { SWRResponse } from 'swr';

export default function useTransaction(
  id?: string
): SWRResponse<Transaction, Error> {
  return useSWR(`/transactions/${id}`, getFetcher<Transaction>);
}
