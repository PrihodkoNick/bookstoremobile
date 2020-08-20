import api from './index';

export const getUser = async () => {
  return await api.get('/api/auth');
};

export const loginUser = async (body) => {
  return await api.post('/api/auth', body);
};
