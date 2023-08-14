import LOSTARK_API from '@consts/api';
import axios from 'axios';
import RequestLimitError from '@error/RequestLimitError';

const BASE_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

const handleRequest = (config: any) => {
  if (config.url?.endsWith(LOSTARK_API.market) || config.url?.endsWith(LOSTARK_API.auction)) {
    Object.assign(config.headers, {
      Authorization: `bearer ${process.env.REACT_APP_SMILEGATE_TOKEN}`,
    });
  }

  return config;
};

const handleRequestError = (error: any) => {
  return Promise.reject(error);
};

const handleResponseSuccess = (response: any) => {
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 429) {
    return Promise.reject(new RequestLimitError('Request Limit'));
  }
  return response;
};

const handleResponseError = (error: any) => {
  console.log('error in axiosInstance.interceptors.response.use');
  console.log(error);

  const { response } = error;

  // 요청을 많이 보내면 여기로 옴 (handleResponseSuccess가 아님)
  if (response.status === 429) {
    return Promise.reject(new RequestLimitError('Request Limit'));
  }

  if (response && response.data) {
    return Promise.reject(response.data);
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(handleRequest, handleRequestError);
axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default axiosInstance;
