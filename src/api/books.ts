import api from './index';

export const getBooks = async (queryParams?: string | null) => {
  if (queryParams) {
    return await api.get(`/api/books${queryParams}`);
  } else {
    return await api.get('/api/books');
  }
};
