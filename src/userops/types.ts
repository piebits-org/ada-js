export interface FETCH_SELF_RES {
  _id: string;
  email: string;
  verified: boolean;
  account_status: 'enabled' | 'disabled';
  created_at: string;
  updated_at: string;
}

export type FETCH_SELF_METHOD = () => Promise<FETCH_SELF_RES>;
