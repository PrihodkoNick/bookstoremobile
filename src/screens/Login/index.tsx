import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {login, loadUser, reloadUser} from '../../actions/auth';
import {getMessageForBiometrics} from '../../utils/getMessageForBiometrics';
import {getToken} from '../../utils/getToken';
import {showToast} from '../../utils/showToast';

import LoginForm from './components/LoginForm';

import {CredentialsType} from '../../types';

interface LoginProps {
  login: (credentials: CredentialsType) => void;
  loadUser: () => void;
  reloadUser: (token: string) => void;
}

const Login: FC<LoginProps> = ({login, loadUser, reloadUser}) => {
  const [biometryType, setBiometryType] = useState<string | undefined>(
    undefined,
  );

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

  const showAuthenticationDialog = () => {
    if (biometryType !== null && biometryType !== undefined) {
      const token = getToken();
      if (token) {
        FingerprintScanner.authenticate({
          description: getMessageForBiometrics(biometryType),
        })
          .then(() => {
            console.log('Login success!!!!');

            reloadUser(token);
            // showToast('Login success', 'success');
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

export default connect(null, {login, loadUser, reloadUser})(Login);
