import { getFetcher } from '@/libs/fetcher';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

export default function usePredictions() {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken ?? '');

  const date = useRecoilValue(selectedDateAtom);
  const year = date.getFullYear();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth().toString().padStart(2, '0');
  const endDate = `${year}-${day}-${month}`;

  return useSWR(
    [`/transactions/${endDate}/prediction`, config],
    ([url, config]) => getFetcher<number>(url, config)
  );
}
