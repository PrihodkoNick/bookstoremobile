import {combineReducers} from 'redux';
import auth from './auth.js';
import books from './books';

const allReducers = combineReducers({
  auth,
  books,
});

export default allReducers;
