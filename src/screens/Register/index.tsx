import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';

import {register} from '../../actions/auth';

import RegisterForm from './components/RegisterForm';

import {CredentialsType} from '../../types';

interface RegisterProps {
  register: (credentials: CredentialsType) => void;
}

const Register: FC<RegisterProps> = ({register}) => {
  const onRegisterSubmit = (data: CredentialsType) => {
    console.log('onRegisterSubmit -> data:', data);
    console.log(typeof data);

    register(data);
  };

  return (
    <Container>
      <Content padder>
        <RegisterForm onSubmit={onRegisterSubmit} />
      </Content>
    </Container>
  );
};

export default connect(null, {register})(Register);
