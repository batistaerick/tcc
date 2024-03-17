import { TransactionType } from '@/enums/enums';
import { getFetcher } from '@/libs/fetchers';
import { selectedDateAtom } from '@/recoil/recoilValues';
import { PaginatedTransactions } from '@/types/types';
import { getLocalDate } from '@/utils/localDate';
import { useRecoilValue } from 'recoil';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';

export default function useTransactions(
  transactionType: TransactionType,
  size?: number
): SWRInfiniteResponse<PaginatedTransactions, Error> {
  const date: Date = useRecoilValue(selectedDateAtom);
  const startDate: string = getLocalDate(date);
  const endDate: string = getLocalDate(date);

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
        params: {
          transactionType,
          startDate,
          endDate,
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
