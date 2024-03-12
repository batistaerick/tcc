import { getFetcher } from '@/libs/fetchers';
import { AxiosRequestConfig } from 'axios';
import useSWR, { SWRResponse } from 'swr';

export default function useProfileImage(): SWRResponse<File, Error> {
  const config: AxiosRequestConfig = { responseType: 'blob' };

  return useSWR(['/images', config], ([url, config]) =>
    getFetcher<File>(url, config)
  );
}
