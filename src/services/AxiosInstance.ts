import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      config.url?.endsWith('/lostark/markets/items') ||
      config.url?.endsWith('/lostark/auctions/items')
    ) {
      Object.assign(config.headers, {
        Authorization: `bearer ${process.env.REACT_APP_SMILEGATE_TOKEN}`,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      // throw new Error('Request Limit');
      return response.data;
    } else if (response.status === 429) {
      throw new Error('Request Limit');
    }
    return response;
  },
  (error) => {
    console.log('error in axiosInstance.interceptors.response.use');
    console.log(error);
    const { response } = error;

    if (response.status === 429) {
      // // eslint-disable-next-line no-debugger
      // debugger;
      throw new Error('Request Limit');
    }

    if (response && response.data) {
      return Promise.reject(response.data);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
