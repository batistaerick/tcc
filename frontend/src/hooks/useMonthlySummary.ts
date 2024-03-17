import { getFetcher } from '@/libs/fetchers';
import { MonthlySummary } from '@/types/types';
import useSWR, { SWRResponse } from 'swr';

export default function useMonthlySummary(): SWRResponse<
  MonthlySummary[],
  Error
> {
  return useSWR(`/transactions/monthly-summary`, getFetcher<MonthlySummary[]>);
}
