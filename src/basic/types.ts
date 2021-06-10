export interface SIGNUP_PARAMS {
  email: string;
  password: string;
  props?: {
    [key: string]: any
  }
}

export interface SIGNUP_RES {
  access_token: string;
  refresh_token: string;
}

export type SIGNUP_METHOD = (params: SIGNUP_PARAMS) => Promise<SIGNUP_RES>;

export interface SIGNIN_PARAMS {
  key: string;
  password: string;
}

export interface SIGNIN_RES {
  access_token: string;
  refresh_token: string;
}

export type SIGNIN_METHOD = (params: SIGNIN_PARAMS) => Promise<SIGNIN_RES>;
