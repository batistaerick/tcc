import { getFetcher } from '@/libs/fetchers';
import { User } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import useSWR, { SWRResponse } from 'swr';

export default function useCurrentUser(): SWRResponse<User, Error> {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken);

  return useSWR(['/users/current-user', config], ([url, config]) =>
    getFetcher<User>(url, config)
  );
}
