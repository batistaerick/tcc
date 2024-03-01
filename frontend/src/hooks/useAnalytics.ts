import { getFetcher } from '@/libs/fetchers';
import { Analytic } from '@/types/types';
import useSWR, { SWRResponse } from 'swr';

export default function useAnalytics(): SWRResponse<Analytic[], Error> {
  return useSWR('/analytics', getFetcher<Analytic[]>);
}
