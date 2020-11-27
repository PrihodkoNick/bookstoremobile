import AsyncStorage from '@react-native-async-storage/async-storage';

import {loginUser, getUser, registerUser, editUser} from '../api/auth';
import {showToast} from '../utils/showToast';
import {ACTION_TYPES} from './types';
import {AppThunk, ServerErrorType} from '../types';

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
        errors.forEach((error: ServerErrorType) => {
          showToast(error.msg, 'danger');
        });
      }
      await AsyncStorage.removeItem('token');

      dispatch({
        type: ACTION_TYPES.loginFail,
      });
    });
};

// Load User
export const loadUser = (): AppThunk => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
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
          errors.forEach((error: ServerErrorType) => {
            showToast(error.msg, 'danger');
          });
        }

        await AsyncStorage.removeItem('token');

        dispatch({
          type: ACTION_TYPES.authError,
        });
      });
  }
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
        errors.forEach((error: ServerErrorType) => {
          showToast(error.msg, 'danger');
        });
      }
      await AsyncStorage.removeItem('token');

      dispatch({
        type: ACTION_TYPES.registerFail,
      });
    });
};

// Logout
export const logout = (): AppThunk => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('token');

    dispatch({type: ACTION_TYPES.logOut});
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error: ServerErrorType) => {
        showToast(error.msg, 'danger');
      });
    }
  }
};

// Update User
export const updateUser = (data: FormData): AppThunk => async (dispatch) => {
  try {
    const res = await editUser(data);

    dispatch({
      type: ACTION_TYPES.updateUser,
      payload: res.data,
    });

    showToast('User updated', 'success');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error: ServerErrorType) => {
        showToast(error.msg, 'danger');
      });
    }
  }
};
