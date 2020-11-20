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

import {CredentialsType} from '../../../types';

interface LoginFormProps {
  onSubmit: (values: CredentialsType) => void;
}

type LoginFormValues = {
  email?: string;
  password?: string;
};

const LoginForm: FC<LoginFormProps> = ({onSubmit}) => {
  const initialValues = {email: '', password: ''};

  const handleSubmitForm = (values: CredentialsType) => {
    onSubmit(values);
  };

  const handleValidate = (values: CredentialsType) => {
    const errors: LoginFormValues = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
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
            <InputLabel label="Email" />
            <ErrorMessage
              name="email"
              render={(msg) => <InputErrorText>{msg}</InputErrorText>}
            />
            <Input
              focused={true}
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
              type="password"
              placeHolder="password"
              onChangeText={handleChange('password')}
              value={values.password}
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

export default LoginForm;
