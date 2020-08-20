import React from 'react';

import {
  Container,
  Header,
  Left,
  Right,
  Content,
  Text,
  Card,
  CardItem,
  Button,
  Title,
  Body,
} from 'native-base';

const Profile = ({navigation}) => {
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
              <Text>Profile screen</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Profile;
