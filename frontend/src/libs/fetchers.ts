import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const defaultAxios = axios.create({
  baseURL,
});

export async function getFetcher<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await defaultAxios
    .get<T>(url, config)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.response.data);
    });
  return response;
}

export async function postFetcher<T>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await defaultAxios
    .post<T>(url, body, config)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.response.data);
    });
  return response;
}

export async function putFetcher<T>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await defaultAxios
    .put<T>(url, body, config)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.response.data);
    });
  return response;
}

export async function deleteFetcher(url: string, config?: AxiosRequestConfig) {
  await defaultAxios.delete(url, config);
}
