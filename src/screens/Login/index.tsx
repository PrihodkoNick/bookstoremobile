import React, {FC, useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {loadUser, login} from '../../actions/auth';
import {getMessageForBiometrics} from '../../utils/getMessageForBiometrics';
import {showToast} from '../../utils/showToast';

import LoginForm from './components/LoginForm';

import {CredentialsType} from '../../types';
import {ACTION_TYPES} from '../../actions/types';

interface LoginProps {
  login: (credentials: CredentialsType) => void;
  loadUser: () => void;
}

const Login: FC<LoginProps> = ({login, loadUser}) => {
  const [biometryType, setBiometryType] = useState<string | undefined>(
    undefined,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        setBiometryType(biometryType);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onLoginSubmit = (credentials: CredentialsType) => {
    login(credentials);
  };

  const showAuthenticationDialog = async () => {
    if (biometryType !== null && biometryType !== undefined) {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        FingerprintScanner.authenticate({
          description: getMessageForBiometrics(biometryType),
        })
          .then(() => {
            dispatch({
              type: ACTION_TYPES.loginSuccess,
              payload: token,
            });

            loadUser(token);

            showToast('Login success', 'success');
          })
          .catch((error) => {
            console.log('Authentication error is => ', error);
          });
      } else {
        showToast(
          'You have no authorization before! Please, login with credentials.',
          'warning',
        );
      }
    } else {
      console.log('Biometric authentication is not available');
    }
  };

  return (
    <Container>
      <Content padder>
        <LoginForm onSubmit={onLoginSubmit} />
        {biometryType && (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={showAuthenticationDialog}>
            <Ionicons
              name={'finger-print-outline'}
              size={40}
              color={'#5c6bc0'}
            />
          </TouchableOpacity>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
  },
});

export default connect(null, {login, loadUser})(Login);
