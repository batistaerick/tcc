import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function usePredictions(endDate: Date) {
  const { data, error, isLoading } = useSWR(
    `/api/predictions/${endDate}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
}
