import React from 'react';
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
  View,
} from 'native-base';

import {register} from '../../actions/auth';

import RegisterForm from './components/RegisterForm';

const Register = ({navigation, isAuthenticated, register}) => {
  if (isAuthenticated) {
    navigation.navigate('Home');
  }

  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  const onRegisterSubmit = (credentials) => {
    register(credentials);
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
        <View>
          <Text>Sign Up</Text>
        </View>
        <RegisterForm onSubmit={onRegisterSubmit} />
      </Content>
    </Container>
  );
};

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, {register})(Register);
