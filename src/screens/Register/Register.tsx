import React, {FC} from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  Content,
  Body,
  Text,
  Left,
  Button,
  Title,
  Right,
} from 'native-base';

import {register} from '../../actions/auth';

import RegisterForm from './components/RegisterForm';

type CredsType = {
  name: string;
  email: string;
  password: string;
};

interface RegisterProps {
  navigation: any;
  register: (credentials: CredsType) => void;
}

const Register: FC<RegisterProps> = ({navigation, register}) => {
  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  const onRegisterSubmit = (data: CredsType) => {
    register(data);
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={toggleDrawer}>
            <Text>Menu</Text>
          </Button>
        </Left>
        <Body>
          <Title>Book Store</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <RegisterForm onSubmit={onRegisterSubmit} />
      </Content>
    </Container>
  );
};

export default connect(null, {register})(Register);
