import {ACTION_TYPES} from '../actions/types';

const initialState = {
  data: [],
  loading: true,
  error: null,
  categories: [],
  authors: [],
  favorites: [],
};

type BookActionType = {
  type: string;
  payload: any;
}

export default function (state = initialState, action: BookActionType) {
  const {type, payload} = action;

  switch (type) {
    case ACTION_TYPES.loadBooks:
    case ACTION_TYPES.loadUserFavoritesBooks:
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };

    // case ACTION_TYPES.addBook:
    //   return {
    //     ...state,
    //     data: [...state.data, payload]
    //   };

    // case ACTION_TYPES.loadCategories:
    //   return {
    //     ...state,
    //     categories: payload,
    //   };

    // case ACTION_TYPES.loadAuthors:
    //   return {
    //     ...state,
    //     authors: payload,
    //   };

    // case ACTION_TYPES.loadFavorites:
    // case ACTION_TYPES.setFavorite:
    //   return {
    //     ...state,
    //     favorites: payload,
    //   };

    default:
      return state;
  }
}
