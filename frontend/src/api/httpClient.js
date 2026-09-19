import axios from 'axios';

import { APP } from '@/constants/app';

const httpClient = axios.create({
  baseURL: APP.baseUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ks_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = error.response?.data?.message || error.response?.data?.error;
    if (!message) {
      if (error.response?.status === 500) {
        message = 'Server error (500). Please ensure the backend server is running and database is accessible.';
      } else if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        message = 'Cannot reach backend server. Please check your internet connection or start the local API service.';
      } else {
        message = error.message || 'An unexpected error occurred during request.';
      }
    }
    return Promise.reject(new Error(message));
  }
);

export default httpClient;
