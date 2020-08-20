import React from 'react';

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
  Form,
  Item,
  Input,
} from 'native-base';

const Register = ({navigation}) => {
  const toggleDrawer = () => {
    navigation.openDrawer();
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
        <Form>
          <Item>
            <Input placeholder="User name" />
          </Item>
          <Item>
            <Input placeholder="Email" />
          </Item>
          <Item last>
            <Input placeholder="Password" secureTextEntry={true} />
          </Item>
          <Item>
            <Input placeholder="Confirm password" secureTextEntry={true} />
          </Item>
        </Form>
        <Button block>
          <Text>Sign Up</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Register;
