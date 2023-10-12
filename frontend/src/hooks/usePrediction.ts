import { getFetcher } from '@/libs/fetcher';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { getLocalDate } from '@/utils/localDate';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

export default function usePredictions() {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken ?? '');

  const date = useRecoilValue(selectedDateAtom);
  const endDate = getLocalDate(date);

  return useSWR(
    [`/transactions/${endDate}/prediction`, config],
    ([url, config]) => getFetcher<number>(url, config)
  );
}
