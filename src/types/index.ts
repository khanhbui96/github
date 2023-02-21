export type Config = {
  data: string;
  isSelected: boolean;
};
export type Configs = Config[];

export type Login = {
  email: string;
  password: string;
};
export type Register = {
  email: string;
  password: string;
  invite_code: string;
  email_code: string;
};
export type Auth = {
  token: string;
  is_admin: string;
  auth_data: string;
};
export type AuthData = {
  data: Auth;
  status: number;
};

export type Plan = Object;
export type Plans = Object[];
