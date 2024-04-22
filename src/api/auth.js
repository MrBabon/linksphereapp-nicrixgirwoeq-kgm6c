import * as SecureStore from 'expo-secure-store';

export const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      return token;
    } catch (error) {
      console.error('Error retrieving the token', error);
      return null;
    }
  };