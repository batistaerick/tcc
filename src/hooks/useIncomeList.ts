import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function useIncomeList(date: Date) {
  const { data, error, isLoading } = useSWR(
    date && `/api/incomes/${date}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
}
