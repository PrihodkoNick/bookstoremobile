import api from './index';

export const getBooks = async (queryParams?: string | null) => {
  if (queryParams) {
    return await api.get(`/api/books${queryParams}`);
  } else {
    return await api.get('/api/books');
  }
};

export const getCategories = async () => {
  return await api.get('/api/categories');
};

export const createBook = async (body: any) => {
  return await api.post('/api/books', body);
};
