import { MMKV } from 'react-native-mmkv';

export const MMKVStorage = new MMKV();

export const clearMMKVStorageAuthData = () => {
  MMKVStorage.delete('userToken');
  MMKVStorage.delete('userNickname');
};
