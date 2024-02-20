import { TransactionType } from '@/enums/enums';
import { getFetcher } from '@/libs/fetchers';
import { selectedDateAtom } from '@/recoil/recoilValues';
import { PaginatedTransactions } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { getLocalDate } from '@/utils/localDate';
import { AxiosRequestConfig } from 'axios';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';

export default function useTransactions(
  transactionType: TransactionType,
  size: number
): SWRInfiniteResponse<PaginatedTransactions, Error> {
  const { data } = useSession();
  const date: Date = useRecoilValue(selectedDateAtom);
  const startDate: string = getLocalDate(date);
  const endDate: string = getLocalDate(date);

  const config: AxiosRequestConfig = buildHeadersAuthorization(
    data?.user.accessToken
  );

  const getKey = (
    pageIndex: number,
    previousPageData: PaginatedTransactions | null
  ) => {
    if (previousPageData && previousPageData.last) {
      return null;
    }
    return {
      url: '/transactions',
      config: {
        ...config,
        params: {
          startDate,
          endDate,
          transactionType,
          page: pageIndex,
          size,
        },
      },
    };
  };

  return useSWRInfinite<PaginatedTransactions>(getKey, ({ url, config }) =>
    getFetcher<PaginatedTransactions>(url, config)
  );
}
