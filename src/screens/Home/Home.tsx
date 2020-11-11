import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, StyleSheet, StatusBar} from 'react-native';
import {Container, Content, Text, Card, CardItem, Body} from 'native-base';

import {logout} from '../../actions/auth';
import {loadBooks} from '../../actions/books';

import HeaderApp from '../../components/Header/HeaderApp';

interface HomeProps {
  navigation: any;
  isAuthenticated: boolean;
  logout: () => void;
  loadBooks: (queryParams: string) => void;
  books: any;
}

const Item = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Home: FC<HomeProps> = ({
  navigation,
  isAuthenticated,
  logout,
  loadBooks,
  books,
}) => {
  useEffect(() => {
    loadBooks('');
  }, [loadBooks]);

  const renderItem = ({item}: {item: any}) => <Item title={item.title} />;

  return (
    <Container>
      <HeaderApp
        navigation={navigation}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <Content padder>
        {books ? (
          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text>Loading</Text>
        )}
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
};

const mapStateToProps = ({auth, books}: {auth: any; books: any}) => ({
  isAuthenticated: auth.isAuthenticated,
  books: books?.data,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default connect(mapStateToProps, {logout, loadBooks})(Home);
