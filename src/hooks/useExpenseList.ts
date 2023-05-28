import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function useExpenseList(date: Date) {
  const { data, error, isLoading } = useSWR(
    date && `/api/expenses/${date}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
}
