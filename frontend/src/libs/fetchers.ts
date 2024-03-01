import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL!;
const defaultAxios: AxiosInstance = axios.create({ baseURL });

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
  body: T,
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
  await defaultAxios.delete(url, config);
}
