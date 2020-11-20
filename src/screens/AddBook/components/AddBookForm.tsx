import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {Formik, ErrorMessage} from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  Input,
  Button,
  InputLabel,
  InputErrorText,
} from '../../../components/UI';

type AddBookFormValues = {
  title?: string;
  author?: string;
  description?: string;
  fragment?: string;
  price?: string;
  categoryId?: string;
};

type Category = {
  label: string;
  value: string;
};

interface AddBookFormProps {
  categories: Category[];
  onSubmit: (values: AddBookFormValues) => void;
}

const AddBookForm: FC<AddBookFormProps> = ({categories, onSubmit}) => {
  const [category, setCategory] = useState(categories[0].value);

  const initialValues: AddBookFormValues = {
    title: '',
    author: '',
    description: '',
    fragment: '',
    price: '',
    categoryId: '',
  };

  const handleSubmitForm = (values: AddBookFormValues, actions: any) => {
    const formValues = values;
    values.categoryId = category;

    onSubmit(formValues);
    actions.resetForm({});
    setCategory(categories[0].value);
  };

  const handleValidate = (values: AddBookFormValues) => {
    const errors: AddBookFormValues = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    if (!values.author) {
      errors.author = 'Required';
    }

    if (!values.price) {
      errors.price = 'Required';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => handleValidate(values)}
      onSubmit={(values, actions) => handleSubmitForm(values, actions)}>
      {({handleChange, handleSubmit, values}) => (
        <View>
          <View style={styles.inputContainer}>
            <InputLabel label="Title" />
            <ErrorMessage
              name="title"
              render={(msg) => <InputErrorText>{msg}</InputErrorText>}
            />
            <Input
              placeHolder="title"
              onChangeText={handleChange('title')}
              value={values.title}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputLabel label="Author" />
            <ErrorMessage
              name="author"
              render={(msg) => <InputErrorText>{msg}</InputErrorText>}
            />
            <Input
              placeHolder="author"
              onChangeText={handleChange('author')}
              value={values.author}
            />
          </View>
          <View style={styles.pickerContainer}>
            <InputLabel label="Category" />
            <DropDownPicker
              items={categories}
              defaultValue={category}
              containerStyle={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownStyle={styles.pickerDropDown}
              activeLabelStyle={styles.pickerActiveLabel}
              onChangeItem={(item) => setCategory(item.value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputLabel label="Description" />
            <Input
              placeHolder="description"
              onChangeText={handleChange('description')}
              value={values.description}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputLabel label="Fragment" />
            <Input
              placeHolder="fragment"
              onChangeText={handleChange('fragment')}
              value={values.fragment}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputLabel label="Price ($)" />
            <ErrorMessage
              name="price"
              render={(msg) => <InputErrorText>{msg}</InputErrorText>}
            />
            <Input
              placeHolder="price"
              onChangeText={handleChange('price')}
              value={values.price}
            />
          </View>
          <Button onPress={handleSubmit}>
            <Text>Submit</Text>
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pickerContainer: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 10,
  },
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  pickerItem: {
    justifyContent: 'flex-start',
  },
  pickerDropDown: {
    backgroundColor: '#fafafa',
    zIndex: 1000,
  },
  pickerActiveLabel: {
    color: '#5c6bc0',
  },
});

export default AddBookForm;
