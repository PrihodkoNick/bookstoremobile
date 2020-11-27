import {ACTION_TYPES} from '../actions/types';

type State = {
  token: string | null;
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState: State = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
};

// export type Actions = 
//   | {type: typeof registerSuccess, id: string};

export default function (state: State = initialState, action: any): State {
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
