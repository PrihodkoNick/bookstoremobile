import React from 'react';

import {Header, Left, Button, Text, Body, Title, Right} from 'native-base';

const HeaderApp = ({navigation, isAuthenticated, logout}) => {
  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Header>
      <Left>
        <Button transparent onPress={toggleDrawer}>
          <Text>Menu</Text>
        </Button>
      </Left>
      <Body>
        <Title>Book Store</Title>
      </Body>
      {isAuthenticated ? (
        <Right>
          <Button transparent onPress={logout}>
            <Text>Logout</Text>
          </Button>
        </Right>
      ) : null}
    </Header>
  );
};

export default HeaderApp;
