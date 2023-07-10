import fetcher from '@/libs/fetcher';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

export default function usePredictions() {
  const predictionDate = useRecoilValue(selectedDateAtom);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/predictions/${predictionDate}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
}
