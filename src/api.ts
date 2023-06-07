import axios from 'axios';

export const API_URL = 'https://expa.fly.dev';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (err) => {
    const newAccessToken = await api.post('/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });

    return api.request({
      ...err.config,
      headers: {
        ...err.config.headers,
        Authorization: newAccessToken,
      },
    });
  },
);

export default api;
