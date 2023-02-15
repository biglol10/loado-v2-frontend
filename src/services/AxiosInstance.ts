import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('config in axiosInstance is');
    console.log(config);

    Object.assign(config.headers, {
      Authorization: `bearer ${process.env.REACT_APP_SMILEGATE_TOKEN}`,
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log('error in axiosInstance.interceptors.response.use');
    const { response } = error;

    if (response && response.data) {
      return Promise.reject(response.data);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
