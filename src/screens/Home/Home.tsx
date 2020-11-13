import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {Container, Content, Text} from 'native-base';

import {logout} from '../../actions/auth';
import {loadBooks} from '../../actions/books';

import HeaderApp from '../../components/Header/HeaderApp';
import BookCard from '../../components/BookCard';

interface HomeProps {
  navigation: any;
  isAuthenticated: boolean;
  logout: () => void;
  loadBooks: (queryParams: string) => void;
  books: any;
}

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

  const renderItem = ({item}: {item: any}) => (
    <BookCard isAuthenticated={isAuthenticated} item={item} />
  );

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
      </Content>
    </Container>
  );
};

const mapStateToProps = ({auth, books}: {auth: any; books: any}) => ({
  isAuthenticated: auth.isAuthenticated,
  books: books?.data,
});

export default connect(mapStateToProps, {logout, loadBooks})(Home);
