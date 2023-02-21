import {
  login,
  api,
  getSubscribe,
  notice,
  register,
  knowledge,
  saveOrder,
  orderDetail,
  orderCancel,
  fetchOrder,
  fetchServer,
  fetchInvite,
  fetchConfig,
  createInvite,
  changePassword,
  resetSecurity,
  phone,
} from './5gDataVip';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Login, AuthData, Register} from '../types/index';

export const getAuthApi = async ({email, password}: Login) => {
  const {data, status} = await api.post(login, {
    email,
    password,
  });
  await EncryptedStorage.setItem('auth_data', JSON.stringify(data));
  const authData: AuthData = {
    data: data.data,
    status,
  };
  return authData;
};
export const registerApi = async ({
  email,
  password,
  invite_code,
  email_code,
}: Register) => {
  const {data, status} = await api.post(register, {
    email,
    password,
    invite_code,
    email_code,
  });
  const authData: AuthData = {
    data: data.data,
    status,
  };
  return authData;
};
export const getSubscribeApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(getSubscribe, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data.data;
};
export const getNoticeApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(notice, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data.data;
};
export const getKnowledgeApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(`${knowledge}?language=vi-VN`, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data.data;
};
export const getKnowledgeItemApi = async ({
  id,
  language,
}: {
  id: string;
  language: string;
}) => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(`${knowledge}?id=${id}&language=${language}`, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data.data;
};
export const saveOrderApi = async ({
  period,
  plan_id,
}: {
  period: string;
  plan_id: number;
}) => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.post(
    saveOrder,
    {period, plan_id},
    {
      headers: {
        Authorization: `${authData.data.auth_data}`,
      },
    },
  );
  return data;
};
export const orderDetailApi = async ({trade_no}: {trade_no: string}) => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(`${orderDetail}${trade_no}`, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data;
};
export const orderCancellApi = async ({trade_no}: {trade_no: string}) => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.post(
    orderCancel,
    {
      trade_no,
    },
    {
      headers: {
        Authorization: `${authData.data.auth_data}`,
      },
    },
  );
  return data;
};
export const fetchOrderApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(fetchOrder, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data;
};
export const fetchServerApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(fetchServer, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data;
};
export const fetchInviteApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(fetchInvite, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data;
};
export const fetchConfigApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(fetchConfig, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data;
};
export const createInviteApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(createInvite, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data;
};
export const changePasswordApi = async ({old_password, new_password}: any) => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.post(
    changePassword,
    {
      old_password,
      new_password,
    },
    {
      headers: {
        Authorization: `${authData.data.auth_data}`,
      },
    },
  );
  return data;
};
export const resetSecurityApi = async () => {
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(resetSecurity, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  return data;
};

export const MomoPayApi = async ({
  amount,
  note,
}: {
  amount: number;
  note: string;
}) => {
  const {data} = await axios.get(
    `https://momosv3.apimienphi.com/api/QRCode?phone=${phone}&amount=${amount}&note=${note}`,
  );
  return data;
};

export const ActiveAppApi = async () => {
  const {data} = await axios.get(
    `https://capricious-dazzling-feather.glitch.me/profile`,
  );
  return data;
};
