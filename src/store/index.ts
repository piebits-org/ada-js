import { State } from './types';

class STORE {
  public state: State = {};

  public set(key: string, value: any) {
    this.state[key] = value;
  }
}

export const store = new STORE();
