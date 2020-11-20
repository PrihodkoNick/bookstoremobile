import {getBooks, getCategories, createBook} from '../api/books';
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

// get categories
export const loadCategories = () => async (dispatch: any) => {
  try {
    const res = await getCategories();

    dispatch({
      type: ACTION_TYPES.loadCategories,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => showToast(error.msg, 'danger'));
    }
  }
};

// add book
export const addBook = (data: any) => async (dispatch: any) => {
  console.log(456);
  const body = JSON.stringify({data});
  console.log('addBook -> body:', body);

  try {
    const res = await createBook(body);
    dispatch({
      type: ACTION_TYPES.bookAdd,
      payload: res.data,
    });

    showToast('Book created', 'success');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => showToast(error.msg, 'danger'));
    }
  }
};