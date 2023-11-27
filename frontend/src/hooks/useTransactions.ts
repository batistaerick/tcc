import { TransactionType } from '@/enums/enums';
import { getFetcher } from '@/libs/fetchers';
import { selectedDateAtom } from '@/recoil/recoilValues';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { getLocalDate } from '@/utils/localDate';
import { AxiosRequestConfig } from 'axios';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

export default function useTransactions(transactionType: TransactionType) {
  const { data } = useSession();
  const date = useRecoilValue(selectedDateAtom);
  const startDate = getLocalDate(date);
  const endDate = getLocalDate(date);

  const config: AxiosRequestConfig = {
    ...buildHeadersAuthorization(data?.user.accessToken),
    params: {
      startDate,
      endDate,
      transactionType,
    },
  };

  const response = useSWR(['/transactions', config], ([url, config]) =>
    getFetcher<Transaction[]>(url, config)
  );
  return response;
}
