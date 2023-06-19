import axios, { AxiosRequestHeaders } from 'axios';

export const API_URL = 'https://expa.fly.dev';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  const newconfig = { ...config };
  if (accessToken) {
    newconfig.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;
  }

  return newconfig;
});

api.interceptors.response.use(
  (config) => config,
  async (err) => {
    if (
      err?.response?.data?.statusCode === 401 &&
      err?.response?.data?.message === 'Token has been revoked'
    ) {
      const newAccessToken = await api.post('/auth/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
      });
      localStorage.setItem('accessToken', newAccessToken.data.accessToken);

      return api.request({
        ...err.config,
        headers: {
          ...err.config.headers,
          Authorization: newAccessToken.data.accessToken,
        },
      });
    }

    throw err;
  },
);

export default api;
