import {api, plan} from './5gDataVip';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Plans} from '../types';

export const getPlanApi = async () => {
  let plans: Plans = [];
  const auth_data: any = await EncryptedStorage.getItem('auth_data');
  const authData = JSON.parse(auth_data);
  const {data} = await api.get(plan, {
    headers: {
      Authorization: `${authData.data.auth_data}`,
    },
  });
  plans = data.data;
  return plans;
};
