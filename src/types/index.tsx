import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {RootState} from '../reducers';

export type ImageType = {
  fileName?: string;
  type?: string;
  uri: string;
};

export type CredentialsType = {
  name?: string;
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  about: string;
};

export interface IAuth {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: UserType;
}

type BookType = {
  id: string;
  title: string;
  author: string;
  price: number;
  rate: number;
  cover: string;
};

export type CategoryType = {
  id: string;
  name: string;
};

export interface IBooks {
  data: BookType[];
  loading: boolean;
  error: string;
  categories: CategoryType[];
  authors: string;
  favorites: string;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type ServerErrorType = {
  msg: string;
};

export type AddBookFormValues = {
  title: string;
  author: string;
  description?: string;
  fragment?: string;
  price: string;
  categoryId: string;
};
