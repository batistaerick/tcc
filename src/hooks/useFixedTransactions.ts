import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function useFixedTransactions() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/fixed-transactions/',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
}
