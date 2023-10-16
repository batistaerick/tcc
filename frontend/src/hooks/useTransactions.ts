import { getFetcher } from '@/libs/fetchers';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { getLocalDate } from '@/utils/localDate';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

export default function useTransactions() {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken ?? '');

  const date = useRecoilValue(selectedDateAtom);
  const endDate = getLocalDate(date);

  const response = useSWR(
    [`/transactions/${endDate}/between-dates`, config],
    ([url, config]) => getFetcher<Transaction[]>(url, config)
  );
  return response;
}
