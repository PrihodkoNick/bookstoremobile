import React from 'react';
import {connect} from 'react-redux';

import {Container, Content, Text, Card, CardItem, Body} from 'native-base';

import {logout} from '../../actions/auth';

import HeaderApp from '../../components/Header/HeaderApp';

const Favorites = ({navigation, isAuthenticated, logout}) => {
  return (
    <Container>
      <HeaderApp
        navigation={navigation}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <Content padder>
        <Card>
          <CardItem>
            <Body>
              <Text>Favorites screen</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, {logout})(Favorites);
