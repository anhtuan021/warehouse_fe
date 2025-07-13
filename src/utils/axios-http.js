
import { getRefreshToken } from '@/api/userAPI/user';
import axios from 'axios';

const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
  });
};

const createAuthInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const data = await getRefreshToken();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return instance.request(error.config);
      } catch (refreshError) {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

  return instance;
};

const publicInstance = createAxiosInstance(process.env.NEXT_PUBLIC_APP_URL_BE);
const authInstance = createAuthInstance(process.env.NEXT_PUBLIC_APP_URL_BE);


const request = (instance, config) => {
  return instance({ ...config });
};

const requestWithToken = (instance, config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Bạn cần đăng nhập để thực hiện chức năng này!');
  }

  return instance({
    ...config,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export { publicInstance, authInstance, request, requestWithToken };