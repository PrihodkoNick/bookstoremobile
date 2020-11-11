import {getBooks} from '../api/books';
import {showToast} from '../utils/showToast';
import {ACTION_TYPES} from './types';

// loadBooks
export const loadBooks = (queryParams?: string | null) => async (
  dispatch: any,
) => {
  try {
    const res = await getBooks(queryParams);

    dispatch({
      type: ACTION_TYPES.loadBooks,
      payload: res.data.pageOfItems,
    });

  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => showToast(error.msg, 'danger'));
    }
  }
};
