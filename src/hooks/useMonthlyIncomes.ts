import fetcher from '@/libs/fetcher';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

export default function useMonthlyIncomes() {
  const [selectedDate] = useRecoilState(selectedDateAtom);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/incomes/${selectedDate}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading, mutate };
}
