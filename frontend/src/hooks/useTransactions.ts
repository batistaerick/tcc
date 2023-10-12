import { getFetcher } from '@/libs/fetcher';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

export default function useTransactions() {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken ?? '');

  const date = useRecoilValue(selectedDateAtom);
  const year = date.getFullYear();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth().toString().padStart(2, '0');
  const endDate = `${year}-${day}-${month}`;

  const response = useSWR(
    [`/transactions/${endDate}/between-dates`, config],
    ([url, config]) => getFetcher<Transaction[]>(url, config)
  );
  return response;
}