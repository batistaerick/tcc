import { getFetcher } from '@/libs/fetchers';
import { Analytic } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import useSWR, { SWRResponse } from 'swr';

export default function useAnalytics(): SWRResponse<Analytic[], Error> {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken);

  return useSWR(['/analytics', config], ([url, config]) =>
    getFetcher<Analytic[]>(url, config)
  );
}
