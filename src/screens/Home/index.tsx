import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {Container, Content, Text} from 'native-base';

import {logout} from '../../actions/auth';
import {loadBooks} from '../../actions/books';

import BookCard from '../../components/BookCard';

import {IAuth, IBooks} from '../../types';

interface HomeProps {
  isAuthenticated: boolean;
  loadBooks: (queryParams: string) => void;
  books: IBooks | any;
}

const Home: FC<HomeProps> = ({isAuthenticated, loadBooks, books}) => {
  useEffect(() => {
    loadBooks('');
  }, [loadBooks]);

  const renderItem = ({item}: {item: any}) => (
    <BookCard isAuthenticated={isAuthenticated} item={item} />
  );

  return (
    <Container>
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

const mapStateToProps = ({auth, books}: {auth: IAuth; books: IBooks}) => ({
  isAuthenticated: auth.isAuthenticated,
  books: books?.data,
});

export default connect(mapStateToProps, {logout, loadBooks})(Home);
