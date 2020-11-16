import React, {useState, FC} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {Form, Text} from 'native-base';
import {showToast} from '../../../utils/showToast';

import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';

import {CredentialsType} from '../../../types';

interface LoginFormProps {
  onSubmit: (credentials: CredentialsType) => void;
}

const LoginForm: FC<LoginFormProps> = ({onSubmit}) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const {email, password} = credentials;

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    inputName: string,
  ) => {
    setCredentials({...credentials, [inputName]: e.nativeEvent.text});
  };

  const checkFields = () => {
    let isValid = true;

    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) {
      showToast('Please enter a valid email', 'danger');

      isValid = false;
    }

    if (password.length < 6) {
      showToast('Please enter a password with 6 or more characters', 'danger');

      isValid = false;
    }

    return isValid;
  };

  const handleLogin = () => {
    const isAllValid = checkFields();
    if (isAllValid) {
      const creds = {email, password};

      onSubmit(creds);
    }
  };

  return (
    <Form>
      <Input
        placeHolder="Email Address"
        name="email"
        focused={true}
        onHandleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          handleChange(e, 'email')
        }
      />
      <Input
        placeHolder="Password"
        name="password"
        type="password"
        onHandleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          handleChange(e, 'password')
        }
      />
      <Button onPress={handleLogin}>
        <Text>Sign In</Text>
      </Button>
    </Form>
  );
};

export default LoginForm;
