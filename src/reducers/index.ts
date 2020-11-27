import {combineReducers} from 'redux';
import auth from './auth';
import books from './books';

const allReducers = combineReducers({
  auth,
  books,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
