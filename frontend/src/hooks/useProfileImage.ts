import { getFetcher } from '@/libs/fetchers';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { AxiosRequestConfig } from 'axios';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

export default function useProfileImage() {
  const { data } = useSession();
  const config: AxiosRequestConfig = {
    ...buildHeadersAuthorization(data?.user.accessToken),
    responseType: 'blob',
  };

  const response = useSWR(['/images', config], ([url, config]) =>
    getFetcher<File>(url, config)
  );

  return response;
}
