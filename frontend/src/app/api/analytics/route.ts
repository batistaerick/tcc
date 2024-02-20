import { getFetcher, postFetcher } from '@/libs/fetchers';
import { IPInfo } from '@/types/types';

export async function POST(request: Request) {
  try {
    const { path } = await request.json();
    const { country } = await getFetcher<IPInfo>('https://ipinfo.io/json');
    await postFetcher('/analytics', { path, country });
  } catch (error) {}
  return new Response();
}
