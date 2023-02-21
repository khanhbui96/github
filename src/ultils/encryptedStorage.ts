import EncryptedStorage from 'react-native-encrypted-storage';

export const saveStorage = async (name: string, data: any) => {
  await EncryptedStorage.setItem(name, data);
};
