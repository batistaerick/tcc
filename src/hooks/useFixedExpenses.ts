import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function useFixedExpenses() {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/fixed-expenses/`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading, mutate };
}
