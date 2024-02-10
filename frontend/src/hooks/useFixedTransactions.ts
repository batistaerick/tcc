import { TransactionType } from '@/enums/enums';
import { getFetcher } from '@/libs/fetchers';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import useSWR, { SWRResponse } from 'swr';

export default function useFixedTransactions(
  transactionType: TransactionType
): SWRResponse<Transaction[], any, any> {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken);

  return useSWR(
    [`/transactions/${transactionType}/fixed`, config],
    ([url, config]) => getFetcher<Transaction[]>(url, config)
  );
}
