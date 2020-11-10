import React, {useState, FC} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {Form, Item, Input, Button, Text} from 'native-base';
import {showToast} from '../../../utils/showToast';

type CredsType = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (credentials: CredsType) => void;
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
      <Item>
        <Input
          autoFocus
          placeholder="Email Address"
          onChange={(e) => handleChange(e, 'email')}
        />
      </Item>
      <Item last>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChange={(e) => handleChange(e, 'password')}
        />
      </Item>
      <Button block onPress={handleLogin}>
        <Text>Sign In</Text>
      </Button>
    </Form>
  );
};

export default LoginForm;
