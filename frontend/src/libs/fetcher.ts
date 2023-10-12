import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = 'http://localhost:8080';

export async function getFetcher<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.get(`${baseUrl}${url}`, config);
  return response.data;
}

export async function postFetcher<T>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.post(`${baseUrl}${url}`, body, config);
  return response.data;
}

export async function putFetcher<T>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.put(`${baseUrl}${url}`, body, config);
  return response.data;
}

export async function deleteFetcher<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.delete(`${baseUrl}${url}`, config);
  return response.data;
}
