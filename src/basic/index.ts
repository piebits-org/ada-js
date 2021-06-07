import { AxiosInstance } from 'axios';
import { SIGNIN_METHOD, SIGNUP_METHOD } from './types';
import { state } from '../state';

export class BASIC {
  private axios_instance: AxiosInstance | undefined;

  constructor(axios_instance: AxiosInstance) {
    this.axios_instance = axios_instance;
  }

  public signup: SIGNUP_METHOD = async (params) => {
    try {
      if (this.axios_instance) {
        const { data } = await this.axios_instance.post(
          'providers/basic/signup',
          params,
        );
        state.set({ ...state.state, ...data });
        return Promise.resolve(data);
      }
      return Promise.reject(new Error('use class constructor'));
    } catch {
      return Promise.reject(new Error('Signup Error'));
    }
  };

  public signin: SIGNIN_METHOD = async (params) => {
    try {
      if (this.axios_instance) {
        const { data } = await this.axios_instance.post(
          'providers/basic/signin',
          params,
        );
        state.set({ ...state.state, ...data });
        return Promise.resolve(data);
      }
      return Promise.reject(new Error('use class constructor'));
    } catch {
      return Promise.reject(new Error('Signin Error'));
    }
  };
}
