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

export interface IBooks {
  data: BookType[];
  loading: boolean;
  error: string;
  categories: string;
  authors: string;
  favorites: string;
}
