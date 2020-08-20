import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers.common['x-auth-token'] = token;
  } else {
    delete config.headers.common['x-auth-token'];
  }

  return config;
});

export default api;
