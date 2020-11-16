import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';

import {login} from '../../actions/auth';

import LoginForm from './components/LoginForm';

import {CredentialsType} from '../../types';

interface LoginProps {
  login: (credentials: CredentialsType) => void;
}

const Login: FC<LoginProps> = ({login}) => {
  const onLoginSubmit = (credentials: CredentialsType) => {
    login(credentials);
  };

  return (
    <Container>
      <Content padder>
        <LoginForm onSubmit={onLoginSubmit} />
      </Content>
    </Container>
  );
};

export default connect(null, {login})(Login);
