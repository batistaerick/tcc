import { getFetcher } from '@/libs/fetchers';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { AxiosRequestConfig } from 'axios';
import { useSession } from 'next-auth/react';
import useSWR, { SWRResponse } from 'swr';

export default function useProfileImage(): SWRResponse<File, any, any> {
  const { data } = useSession();
  const config: AxiosRequestConfig = {
    ...buildHeadersAuthorization(data?.user.accessToken),
    responseType: 'blob',
  };

  return useSWR(['/images', config], ([url, config]) =>
    getFetcher<File>(url, config)
  );
}
