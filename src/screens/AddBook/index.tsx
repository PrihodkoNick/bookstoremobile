import React, {FC, useMemo} from 'react';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';

import {addBook} from '../../actions/books';
import {IBooks, AddBookFormValues, CategoryType} from '../../types';

import AddBookForm from './components/AddBookForm';

interface AddBookProps {
  categories: CategoryType[];
  addBook: (values: AddBookFormValues) => void;
}

const AddBook: FC<AddBookProps> = ({categories, addBook}) => {
  const handleSubmit = (values: AddBookFormValues) => {
    addBook(values);
  };

  const memoizedCategories = useMemo(() => {
    return categories.map((item: CategoryType) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  }, [categories]);

  return (
    <Container>
      <Content padder>
        <AddBookForm categories={memoizedCategories} onSubmit={handleSubmit} />
      </Content>
    </Container>
  );
};

const mapStateToProps = ({books}: {books: IBooks}) => ({
  categories: books.categories,
});

export default connect(mapStateToProps, {addBook})(AddBook);
