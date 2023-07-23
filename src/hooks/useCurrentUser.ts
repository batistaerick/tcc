import fetcher from '@/libs/fetcher';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

export default function useCurrentUser() {
  const [selectedDate] = useRecoilState(selectedDateAtom);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/users/${selectedDate}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
}
