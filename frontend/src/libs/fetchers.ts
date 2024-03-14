import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL!;
const defaultAxios: AxiosInstance = axios.create({ baseURL });

defaultAxios.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});

export async function getFetcher<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return await defaultAxios
    .get<T>(url, config)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
}

export async function postFetcher<T>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<T> {
  return await defaultAxios
    .post<T>(url, body, config)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
}

export async function putFetcher<T>(
  url: string,
  body: T,
  config?: AxiosRequestConfig
): Promise<T> {
  return await defaultAxios
    .put<T>(url, body, config)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
}

export async function deleteFetcher(
  url: string,
  config?: AxiosRequestConfig
): Promise<void> {
  await defaultAxios.delete(url, config).catch((error: AxiosError) => {
    throw error;
  });
}
