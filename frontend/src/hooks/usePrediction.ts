import { getFetcher } from '@/libs/fetchers';
import { selectedDateAtom } from '@/recoil/recoilValues';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { getLocalDate } from '@/utils/localDate';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import useSWR, { SWRResponse } from 'swr';

export default function usePredictions(): SWRResponse<number, Error> {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken);

  const date = useRecoilValue(selectedDateAtom);
  const endDate = getLocalDate(date);

  return useSWR(
    [`/transactions/${endDate}/prediction`, config],
    ([url, config]) => getFetcher<number>(url, config)
  );
}
