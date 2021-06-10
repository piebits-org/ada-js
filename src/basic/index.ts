/* eslint-disable class-methods-use-this */
import { AxiosInstance } from 'axios';
import { SIGNIN_METHOD, SIGNUP_METHOD } from './types';
import { store } from '../store';

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
        store.set('tokens', data);
        return Promise.resolve(data);
      }
      return Promise.reject(new Error('use class constructor'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  public signin: SIGNIN_METHOD = async (params) => {
    try {
      if (this.axios_instance) {
        const { data } = await this.axios_instance.post(
          'providers/basic/signin',
          params,
        );
        store.set('tokens', data);
        return Promise.resolve(data);
      }
      return Promise.reject(new Error('use class constructor'));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
