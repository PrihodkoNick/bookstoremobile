import React from 'react';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Button,
  Title,
  Right,
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
        <Card>
          <CardItem>
            <Body>
              <Text>Register screen</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Register;
