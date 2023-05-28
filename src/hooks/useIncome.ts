import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function useIncome() {
  const { data, error, isLoading, mutate } = useSWR('/api/incomes', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading, mutate };
}
