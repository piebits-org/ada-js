import { AxiosInstance } from 'axios';
import { store } from '../store';
import { FETCH_SELF_METHOD, RESET_PASSWORD_METHOD, VERIFY_TOKEN_METHOD } from './types';

export class USEROPS {
  private axios_instance: AxiosInstance | undefined;

  constructor(axios_instance: AxiosInstance) {
    this.axios_instance = axios_instance;
  }

  public fetch_self: FETCH_SELF_METHOD = async () => {
    try {
      if (this.axios_instance) {
        const { data } = await this.axios_instance.get(
          'userops/fetch/self',
          {
            headers: {
              Authorization: `Bearer ${store.state.tokens.access_token}`,
            },
          },
        );
        store.set('user', data.user);
        return Promise.resolve(data.user);
      }
      return Promise.reject(new Error('use class constructor'));
    } catch (e: any) {
      return Promise.reject(new Error(e));
    }
  };

  public refresh_token = async () => {
    try {
      if (this.axios_instance) {
        const { data } = await this.axios_instance.post(
          'userops/refresh',
          {
            refresh_token: store.state.tokens.refresh_token,
          },
        );
        store.set('tokens', { ...store.state.tokens, ...data });
        return Promise.resolve(data);
      }
      return Promise.reject(new Error('use class constructor'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  public reset_password: RESET_PASSWORD_METHOD = async ({ email }) => {
    try {
      if (this.axios_instance) {
        await this.axios_instance.post(
          'userops/resetpass/email/gen',
          {
            email,
          },
        );
        return Promise.resolve();
      }
      return Promise.reject(new Error('use class constructor'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  public verify_token: VERIFY_TOKEN_METHOD = async ({ token, password }) => {
    try {
      if (this.axios_instance) {
        await this.axios_instance.post(
          'userops/resetpass/email/verify',
          {
            token,
            password,
          },
        );
        return Promise.resolve();
      }
      return Promise.reject(new Error('use class constructor'));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
