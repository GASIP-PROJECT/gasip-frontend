import { MMKV } from 'react-native-mmkv';

export const MMKVStorage = new MMKV();

export const clearMMKVStorageAuthData = () => {
  MMKVStorage.delete('userToken');
  // MMKVStorage.delete('userNickname');
  MMKVStorage.delete('memberId');
};

export const setMMKVStorageAuthData = (
  userToken: string,
  userNickname: string,
  memberId: number,
) => {
  MMKVStorage.set('userToken', userToken);
  // MMKVStorage.set('userNickname', userNickname);
  MMKVStorage.set('memberId', memberId);
};
