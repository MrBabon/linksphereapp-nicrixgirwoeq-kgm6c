import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


// Déterminez l'URL de base en fonction de l'environnement
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://linksphere-api-4dc51f475572.herokuapp.com'
  : 'http://192.168.1.13:3000';

const api = axios.create({
    baseURL: BASE_URL,
}); 

export const setAuthInterceptor = (logout) => {
    api.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          const originalRequest = error.config;
          // Vérifier si c'est une tentative de connexion
          if (originalRequest.url.includes('/login')) {
            // Si c'est une tentative de connexion, ne pas exécuter logout()
            return Promise.reject(error);
          }
          await AsyncStorage.removeItem('userToken'); // Supprimez le token JWT
          Alert.alert('Session expirée', 'Votre session a expiré. Veuillez vous reconnecter.');
          logout();
        }
        return Promise.reject(error);
      }
    );
};

export default api;
export { BASE_URL };