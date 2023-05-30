import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function useFixedIncomes() {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/fixed-incomes/`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading, mutate };
}
