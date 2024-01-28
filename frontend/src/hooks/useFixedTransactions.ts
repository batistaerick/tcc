import { TransactionType } from '@/enums/enums';
import { getFetcher } from '@/libs/fetchers';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

export default function useFixedTransactions(transactionType: TransactionType) {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken);

  const response = useSWR(
    [`/transactions/${transactionType}/fixed`, config],
    ([url, config]) => getFetcher<Transaction[]>(url, config)
  );
  return response;
}