import store from '@state/store';
import { showLoader, hideLoader } from '@state/loaderSlice';
import queryString from 'query-string';
import RequestLimitError from '@error/RequestLimitError';
import axiosInstance from './AxiosInstance';

const RPS = 60 * 1020;
const MAX_RETCNT = 2;

type DataType = any;

class BaseService {
  static AUTH: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireDate: string | Date | number;
  } = {
    accessToken: '',
    refreshToken: '',
    accessTokenExpireDate: 0,
  };

  static requestMethod = {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
  };

  static setAuth(param: typeof this.AUTH) {
    if (!param) return;
    this.AUTH = {
      ...param,
    };
    sessionStorage.setItem('lastAuth', new Date().getTime().toString());
    sessionStorage.setItem('auth', JSON.stringify(param));
  }

  static getAuth() {
    return this.AUTH.accessToken && this.AUTH.refreshToken
      ? { ...this.AUTH }
      : JSON.parse(sessionStorage.getItem('auth') || '');
  }

  static clearAuth() {
    this.AUTH = {
      accessToken: '',
      refreshToken: '',
      accessTokenExpireDate: 0,
    };
    sessionStorage.setItem('lastAuth', '');
    sessionStorage.setItem('auth', '');
  }

  static async get(url: string, data?: DataType) {
    const urlValue =
      data === null
        ? url
        : queryString.stringify(data!) !== ''
        ? `${url}?${queryString.stringify(data!)}`
        : url;
    const res = await this.request({
      method: 'get',
      url: urlValue,
    });

    return res.data;
  }

  static async post(url: string, data: DataType) {
    const res = await this.request({ method: 'post', url, data });

    return res.data;
  }

  static async put(url: string, data: DataType) {
    const res = await this.request({ method: 'put', url, data });

    return res.data;
  }

  static async request({
    method = 'get',
    url,
    data,
    retryCnt = 0,
  }: {
    method: 'get' | 'post' | 'put';
    url: string;
    data?: any;
    retryCnt?: number;
  }) {
    try {
      if (store.getState().modal.modalOpen) store.dispatch(showLoader());
      const res = await this.requestMethod[method](url, data);

      store.dispatch(hideLoader());
      return res;
    } catch (error: any) {
      store.dispatch(hideLoader());
      return this.handleError(error, method, url, data, retryCnt);
    }
  }

  static async handleError(
    error: unknown,
    method: 'get' | 'post' | 'put',
    url: string,
    data: any,
    retryCnt: number,
  ): Promise<any> {
    if (error instanceof RequestLimitError) {
      if (MAX_RETCNT <= retryCnt) return error;
      await new Promise((res) => setTimeout(res, RPS));
      const res = await this.request({ method, url, data, retryCnt: retryCnt + 1 });

      return res;
    }
    return error; // instanceof Error
  }
}

export default BaseService;
