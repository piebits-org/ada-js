export interface FETCH_SELF_RES {
  _id: string;
  email: string;
  verified: boolean;
  account_status: 'enabled' | 'disabled';
  created_at: string;
  updated_at: string;
}

export type FETCH_SELF_METHOD = () => Promise<FETCH_SELF_RES>;

export type RESET_PASSWORD_METHOD = (props: { email: string }) => Promise<void>;

export type VERIFY_TOKEN_METHOD = (props: { token: string; password: string }) => Promise<void>;
