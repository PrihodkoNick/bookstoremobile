import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {Formik, ErrorMessage} from 'formik';

import {
  Input,
  Button,
  InputErrorText,
  InputLabel,
} from '../../../components/UI';

interface RegisterFormProps {
  onSubmit: (values: any) => void;
}

type RegisterFormValues = {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
};

const RegisterForm: FC<RegisterFormProps> = ({onSubmit}) => {
  const initialValues = {name: '', email: '', password: '', password2: ''};

  const handleSubmitForm = (values: RegisterFormValues) => {
    onSubmit(values);
  };

  const handleValidate = (values: RegisterFormValues) => {
    const errors: RegisterFormValues = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Please enter a password with 6 or more characters';
    }

    if (!values.password2) {
      errors.password2 = 'Required';
    } else if (values.password !== values.password2) {
      errors.password2 = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => handleValidate(values)}
      onSubmit={(values) => handleSubmitForm(values)}>
      {({handleChange, handleSubmit, values}) => (
        <View>
          <View style={styles.inputContainer}>
            <InputLabel label="User name" />
            <ErrorMessage
              name="name"
              render={(msg) => <InputErrorText>{msg}</InputErrorText>}
            />
            <Input
              focused
              placeHolder="name"
              onChangeText={handleChange('name')}
              value={values.name}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputLabel label="Email" />
            <ErrorMessage
              name="email"
              render={(msg) => <InputErrorText>{msg}</InputErrorText>}
            />
            <Input
              placeHolder="email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputLabel label="Password" />
            <ErrorMessage
              name="password"
              render={(msg) => <InputErrorText>{msg}</InputErrorText>}
            />
            <Input
              secureField
              placeHolder="password"
              onChangeText={handleChange('password')}
              value={values.password}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputLabel label="Confirm password" />
            <ErrorMessage
              name="password2"
              render={(msg) => <InputErrorText>{msg}</InputErrorText>}
            />
            <Input
              secureField
              placeHolder="password2"
              onChangeText={handleChange('password2')}
              value={values.password2}
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
});

export default RegisterForm;
