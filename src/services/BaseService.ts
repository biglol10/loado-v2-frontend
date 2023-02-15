import axiosInstance from './AxiosInstance';

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
  }: {
    method: 'get' | 'post';
    url: string;
    data: any;
  }) {
    try {
      const res = await this.requestMethod[method](url, data);

      console.log(`url in request is ${url}`);
      console.log(`request body : ${JSON.stringify(data)}`);
      console.log(res);
      return res;
    } catch (err) {
      console.log(`error occured when calling ${url}`);
      console.log(err);
      return err;
    }
  }
}

export default BaseService;
