import api from './index';

export const getUser = async () => {
  return await api.get('/api/auth');
};

export const loginUser = async (body) => {
  return await api.post('/api/auth', body);
};

export const registerUser = async (body) => {
  return await api.post('/api/users', body);
};

export const editUser = async (body) => {

  console.log('User body: ', body);

  return await api.patch('/api/users', body);
};
