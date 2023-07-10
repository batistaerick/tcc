import fetcher from '@/libs/fetcher';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

export default function useMonthlyTransactions() {
  const [selectedDate] = useRecoilState(selectedDateAtom);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/transactions/${selectedDate}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
}
