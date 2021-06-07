import { State } from './types';

class STATE {
  public state: State = {};

  public subscribe!: (state: State) => void;

  public set(newstate: State) {
    this.state = newstate;
    this.subscribe(this.state);
  }
}

export const state = new STATE();
