import {loginUser, getUser, registerUser} from '../api/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {showToast} from '../utils/showToast';
import {ACTION_TYPES} from './types';

// Register User
export const register = ({name, email, password}) => (dispatch) => {
  const body = JSON.stringify({name, email, password});

  registerUser(body)
    .then(async (res) => {
      await AsyncStorage.setItem('token', res.data.token);

      dispatch({
        type: ACTION_TYPES.registerSuccess,
        payload: res.data,
      });

      // dispatch(setAlert("Registration success!", "success"));
      dispatch(loadUser()); // load User after registration
    })
    .catch(async (err) => {
      const errors = err.response.data.errors;
      if (errors) {
        console.log(errors);
        // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      await AsyncStorage.removeItem('token');

      dispatch({
        type: ACTION_TYPES.registerFail,
      });
    });
};

// Login User
export const login = ({email, password}) => (dispatch) => {
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
export const register = ({name, email, password}) => (dispatch) => {
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
export const logout = () => (dispatch) => {
  dispatch({type: ACTION_TYPES.logOut});
};
