import axios from 'axios';
import {getAccessToken} from '../utils/getToken';
import {setUnauthenticated} from '../store/auth/authSlice';

const API_BASE_URL = 'http://localhost:3000/api';

let s = null;

export function setStore(store: any) {
  s = store;
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  const accessToken = `Bearer ${token ?? ""}`;
  config.headers = {
    ...config.headers,
    Authorization: accessToken,
  };

  return config;
});

axiosInstance.interceptors.response.use((config) => config,
  async (error) => {
    if (error.response?.status === 401) {
      s.dispatch(setUnauthenticated());
    }
  })
