import AsyncStorage from '@react-native-async-storage/async-storage';

import {loginUser, getUser, registerUser, editUser} from '../api/auth';
import {showToast} from '../utils/showToast';
import {ACTION_TYPES} from './types';
import {AppThunk} from '../types';

// Login User
export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): AppThunk => (dispatch) => {
  const body = JSON.stringify({email, password});

  loginUser(body)
    .then(async (res) => {
      await AsyncStorage.setItem('token', res.data.token);

      dispatch({
        type: ACTION_TYPES.loginSuccess,
        payload: res.data,
      });

      showToast('Login success', 'success');
      dispatch(loadUser()); // load User after login
      // dispatch(loadFavorites()); // load favorites after login
    })
    .catch(async (err) => {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => showToast(error.msg, 'danger'));
      }
      await AsyncStorage.removeItem('token');

      dispatch({
        type: ACTION_TYPES.loginFail,
      });
    });
};

// reloadUser
export const reloadUser = (token: string): AppThunk => (dispatch) => {
  try {
    dispatch({
      type: ACTION_TYPES.loginSuccess,
      payload: token,
    });

    // dispatch(loadUser());
    showToast('Login success', 'success');
  } catch (error) {
    showToast(error.msg, 'danger');
  }
};

// Load User
export const loadUser = (): AppThunk => async (dispatch) => {
  getUser()
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.userLoaded,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => showToast(error.msg, 'danger'));
      }

      await AsyncStorage.removeItem('token');

      dispatch({
        type: ACTION_TYPES.authError,
      });
    });
};

// Register User
export const register = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): AppThunk => (dispatch) => {
  const body = JSON.stringify({name, email, password});

  registerUser(body)
    .then(async (res) => {
      await AsyncStorage.setItem('token', res.data.token);

      dispatch({
        type: ACTION_TYPES.registerSuccess,
        payload: res.data,
      });

      showToast('Registration success', 'success');

      dispatch(loadUser()); // load User after registration
    })
    .catch(async (err) => {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => showToast(error.msg, 'danger'));
      }
      await AsyncStorage.removeItem('token');

      dispatch({
        type: ACTION_TYPES.registerFail,
      });
    });
};

// Logout
export const logout = (): AppThunk => (dispatch) => {
  dispatch({type: ACTION_TYPES.logOut});
};

// Update User
export const updateUser = (data: any): AppThunk => (dispatch) => {
  editUser(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.updateUser,
        payload: res.data,
      });

      showToast('User updated', 'success');
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => showToast(error.msg, 'danger'));
      }
    });
};