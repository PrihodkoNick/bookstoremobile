import {ACTION_TYPES} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  token: AsyncStorage.getItem('token'),
  user: null,
  isAuthenticated: null,
  loading: false,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ACTION_TYPES.registerSuccess:
    case ACTION_TYPES.loginSuccess:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };

    case ACTION_TYPES.registerFail:
    case ACTION_TYPES.loginFail:
    case ACTION_TYPES.authError:
    case ACTION_TYPES.logOut:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    case ACTION_TYPES.userLoaded:
    case ACTION_TYPES.updateUser:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    default:
      return state;
  }
}