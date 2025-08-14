import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@env';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => Promise.reject(error)
);

export const api = {
  get: <T>(url: string) => apiClient.get<T>(url),
  post: <T>(url: string, data?: unknown) => apiClient.post<T>(url, data),
  put: <T>(url: string, data?: unknown) => apiClient.put<T>(url, data),
  delete: <T>(url: string) => apiClient.delete<T>(url),
};
