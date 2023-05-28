import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function useExpense() {
  const { data, error, isLoading, mutate } = useSWR('/api/expenses', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading, mutate };
}
