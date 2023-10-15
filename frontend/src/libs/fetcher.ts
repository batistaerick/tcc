import axios, { AxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:8080';

const defaultAxios = axios.create({
  baseURL,
});

export async function getFetcher<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await defaultAxios.get<T>(url, config);
  return response.data;
}

export async function postFetcher<T>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await defaultAxios.post<T>(url, body, config);
  return response.data;
}

export async function putFetcher<T>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await defaultAxios.put<T>(url, body, config);
  return response.data;
}

export async function deleteFetcher(url: string, config?: AxiosRequestConfig) {
  await defaultAxios.delete(url, config);
}
