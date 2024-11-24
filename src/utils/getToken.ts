import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const getAccessToken = async () => {
  try {
    const result = await SecureStoragePlugin.get({ key: 'accessToken' });
    console.log('Access Token:', result.value);
    return result.value;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};
