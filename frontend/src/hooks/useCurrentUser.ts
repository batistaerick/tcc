import { getFetcher } from '@/libs/fetchers';
import { User } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

export default function useCurrentUser() {
  const { data } = useSession();
  const config = buildHeadersAuthorization(data?.user.accessToken);

  const response = useSWR(['/users/current-user', config], ([url, config]) =>
    getFetcher<User>(url, config)
  );
  return response;
}
