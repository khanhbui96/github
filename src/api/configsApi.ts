import {login, api} from './5gDataVip';
import {Configs, Config} from '../types';
import {decode, isValid} from 'js-base64';
import EncryptedStorage from 'react-native-encrypted-storage';
import Clipboard from '@react-native-clipboard/clipboard';

export const getAllConfigsLocal = async () => {
  const configsLocal: any = await EncryptedStorage.getItem('configs');
  const configs: Configs = JSON.parse(configsLocal);
  if (configs) {
    return configs;
  } else {
    return [];
  }
};
export const getAllConfigsAPI = async () => {
  let configs: Configs = [];
  const authDataLocal: any | null = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(authDataLocal);
  const {data} = await api.get(
    `/api/v1/client/subscribe?token=${authData.data.token}`,
  );
  const vmesses = decode(data).replace(/\n/g, '').split('vmess://');
  vmesses.shift();
  vmesses.map((vmess, index) => {
    configs.push({
      data: vmess,
      isSelected: false,
    });
  });
  await EncryptedStorage.setItem('configs', JSON.stringify(configs));
  return configs;
};
export const importConfigsClipboard = async () => {
  const configsLocal: any = await EncryptedStorage.getItem('configs');
  const configs: Configs = JSON.parse(configsLocal)
    ? JSON.parse(configsLocal)
    : [];
  const configsClipboard = await Clipboard.getString();
  const decodeData = isValid(configsClipboard);
  let vmesses;
  if (decodeData) {
    vmesses = decode(configsClipboard).replace(/\n/g, '').split('vmess://');
  } else {
    vmesses = configsClipboard.replace(/\n/g, '').split('vmess://');
  }
  vmesses.shift();
  vmesses.map((vmess, index) => {
    configs.push({
      data: vmess,
      isSelected: false,
    });
  });
  await EncryptedStorage.setItem('configs', JSON.stringify(configs));
  return configs;
};
export const deleteAllConfigs = async () => {
  await EncryptedStorage.removeItem('configs');
  return [];
};
export const deleteOneConfig = async (config: Config) => {
  const configsLocal: any = await EncryptedStorage.getItem('configs');
  const configs: Configs = JSON.parse(configsLocal);
  const newConfigs: Configs = configs.filter(item => {
    return item.data !== config.data;
  });

  await EncryptedStorage.setItem('configs', JSON.stringify(newConfigs));
  return newConfigs;
};
export const selectOneConfig = async (config: Config) => {
  const configsLocal: any = await EncryptedStorage.getItem('configs');
  const configs: Configs = JSON.parse(configsLocal);
  configs.map(item => {
    if (item.data === config.data) {
      item.isSelected = true;
    } else {
      item.isSelected = false;
    }
    return item;
  });
  await EncryptedStorage.setItem('configs', JSON.stringify(configs));
  return configs;
};
export const testApi = async () => {
  // const {data} = await api.get('/api/v1/user/getSubscribe', {
  //   headers: {
  //     Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDAxLCJzZXNzaW9uIjoiZjJiMTVkOGM1NmM3ZDdiM2IxOWRjN2E0NDE3YWQ5ZWIifQ.4lrqB3ImjqBrpKQSv98K7TSStpPO2PtUKb6XhZTTdOo`,
  //   },
  // });
  const email = '08022023@gmail.com';
  const password = '12345678';

  // const value = await fetch(
  //   'https://5gdatavip.xyz/api/v1/passport/auth/login',
  //   {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   },
  // );
  // const {data} = await api.get(
  //   '/api/v1/client/subscribe?token=a95034f950048bcd7aa3d332ce4f857e',
  // );
  // const data = await fetch(
  //   'https://5gdatavip.xyz/api/v1/client/subscribe?token=a95034f950048bcd7aa3d332ce4f857e',
  // );
  // const a = await axios.get('https://jsonplaceholder.typicode.com/posts');

  // const {data} = await api.post('/api/v1/passport/auth/login', {
  //   email,
  //   password,
  // });
  const {data} = await api.get(
    '/api/v1/client/subscribe?token=cc71f2a82d3ea4357c13102c9bdcc468',
  );
  console.log(data);
};
