import React, {Component} from 'react';

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

export default class Home extends Component {
  toggleDrawer() {
    this.props.navigation.openDrawer();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.toggleDrawer()}>
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
                <Text>Home screen</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
