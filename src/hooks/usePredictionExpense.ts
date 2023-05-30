import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

export default function usePredictionExpense(totalOfMonths: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/expenses/predictions/${totalOfMonths}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading, mutate };
}
