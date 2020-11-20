import React, {FC, useMemo} from 'react';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';

import {addBook} from '../../actions/books';

import AddBookForm from './components/AddBookForm';

type AddBookFormValues = {
  title?: string;
  author?: string;
};

interface AddBookProps {
  categories: any;
  addBook: (values: AddBookFormValues) => void;
}

const AddBook: FC<AddBookProps> = ({categories, addBook}) => {
  const handleSubmit = (values: AddBookFormValues) => {
    console.log(123);
    addBook(values);
  };

  const memoizedCategories = useMemo(() => {
    return categories.map((item: any) => {
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

const mapStateToProps = ({books}: {books: any}) => ({
  categories: books.categories,
});

export default connect(mapStateToProps, {addBook})(AddBook);
