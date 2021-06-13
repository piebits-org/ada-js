import axios, { AxiosInstance } from 'axios';
import { BASIC } from './basic';
import { store } from './store';
import { CONFIG } from './types';
import { USEROPS } from './userops';

export class ADA {
  private config: CONFIG | undefined;

  public axios_instance: AxiosInstance | undefined;

  public supported_versions: Array<string> = ['v0.1.0', 'v0.2.0'];

  public basic: BASIC;

  public userops: USEROPS;

  constructor(params: CONFIG) {
    this.config = params;

    const version_valid = this.supported_versions.includes(this.config.version);

    if (!version_valid) {
      throw new Error('Version Error');
    }

    const version = this.config.version.split('v')[1].replace(/\./g, '');

    this.axios_instance = axios.create({
      baseURL: `https://ada.cloud.piebits.org/${version}/`,
      timeout: 5000,
      headers: {
        'x-ada-app-id': this.config.app_id,
      },
    });

    this.basic = new BASIC(this.axios_instance);
    this.userops = new USEROPS(this.axios_instance);
  }
}

export { store };
