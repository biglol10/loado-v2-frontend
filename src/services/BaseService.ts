import axiosInstance from './AxiosInstance';

const RPS = 60 * 1000;
const MAX_RETCNT = 2;

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

  static async request({
    method = 'get',
    url,
    data,
    retryCnt = 0,
  }: {
    method: 'get' | 'post';
    url: string;
    data: any;
    retryCnt?: number;
  }) {
    try {
      const res = await this.requestMethod[method](url, data);

      return res;
    } catch (error: any) {
      const errMsg = error.message;

      // // eslint-disable-next-line no-debugger
      // debugger;

      if (errMsg === 'Request Limit' && MAX_RETCNT >= retryCnt) {
        console.log('came to request limit');
        await new Promise((res) => setTimeout(res, RPS));
        const res = await this.request({ method, url, data, retryCnt: retryCnt + 1 });

        console.log(`res in Request limit and retryCnt is ${retryCnt}`);
        console.log(res);
        return;
      } else if (errMsg === 'Request Limit' && MAX_RETCNT <= retryCnt) {
        console.log('came to request limit Exceeded');
        throw new Error('Rate Limit Exceeded');
      }
      return error;
    }
  }
}

export default BaseService;
