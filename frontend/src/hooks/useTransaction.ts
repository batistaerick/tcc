import { getFetcher } from '@/libs/fetchers';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import useSWR, { SWRResponse } from 'swr';

export default function useTransaction(
  id: string
): SWRResponse<Transaction, any, any> {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken);

  return useSWR([`/transactions/${id}`, config], ([url, config]) =>
    getFetcher<Transaction>(url, config)
  );
}
