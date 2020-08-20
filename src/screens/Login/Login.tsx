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

import {login} from '../../actions/auth';

import LoginForm from './components/LoginForm';

const Login = ({navigation, isAuthenticated, login}) => {
  if (isAuthenticated) {
    navigation.navigate('Home');
  }

  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  const onLoginSubmit = (credentials) => {
    login(credentials);
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
          <Text>Sign In</Text>
        </View>
        <LoginForm onSubmit={onLoginSubmit} />
      </Content>
    </Container>
  );
};

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);
