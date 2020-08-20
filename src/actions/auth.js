import {loginUser, getUser} from '../api/auth';
import AsyncStorage from '@react-native-community/async-storage';

import {ACTION_TYPES} from './types';

// Login User
export const login = ({email, password}) => async (dispatch) => {
  const body = JSON.stringify({email, password});

  loginUser(body)
    .then(async (res) => {
      await AsyncStorage.setItem('token', res.data.token);

      dispatch({
        type: ACTION_TYPES.loginSuccess,
        payload: res.data,
      });

      // dispatch(setAlert("Login success!", "success"));
      dispatch(loadUser()); // load User after login
      // dispatch(loadFavorites()); // load favorites after login
    })
    .catch(async (err) => {
      const errors = err.response.data.errors;
      if (errors) {
        console.log(errors);
        //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      await AsyncStorage.removeItem('token');

      dispatch({
        type: ACTION_TYPES.loginFail,
      });
    });
};

// Load User
export const loadUser = () => async (dispatch) => {
  getUser()
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.userLoaded,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      console.log(err);
      const errors = err.response.data.errors;
      if (errors) {
        console.log(errors);
        // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      await AsyncStorage.removeItem('token');

      dispatch({
        type: ACTION_TYPES.authError,
      });
    });
};
