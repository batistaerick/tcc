import { getFetcher } from '@/libs/fetchers';
import { selectedDateAtom } from '@/recoil/recoilValues';
import { getLocalDate } from '@/utils/localDate';
import { useRecoilValue } from 'recoil';
import useSWR, { SWRResponse } from 'swr';

export default function usePredictions(): SWRResponse<number, Error> {
  const date = useRecoilValue(selectedDateAtom);
  const endDate = getLocalDate(date);

  return useSWR(`/transactions/${endDate}/prediction`, getFetcher<number>);
}
