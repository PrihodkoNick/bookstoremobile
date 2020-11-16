import React, {useState, FC} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {Form, Text} from 'native-base';
import {showToast} from '../../../utils/showToast';

import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';

import {CredentialsType} from '../../../types';

interface RegisterFormProps {
  onSubmit: (credentials: CredentialsType) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const {name, email, password, password2} = formData;

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    inputName: string,
  ) => {
    setFormData({...formData, [inputName]: e.nativeEvent.text});
  };

  const checkFields = () => {
    let isValid = true;

    if (name.trim().length === 0) {
      showToast('Please enter a valid name', 'danger');

      return false;
    }

    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) {
      showToast('Please enter a valid email', 'danger');

      return false;
    }

    if (password.length < 6) {
      showToast('Please enter a password with 6 or more characters', 'danger');

      return false;
    }

    if (password !== password2) {
      showToast('Passwords do not match', 'danger');

      return false;
    }

    return isValid;
  };

  const handleRegister = () => {
    const isAllValid = checkFields();
    if (isAllValid) {
      const credentials = {name, email, password};
      onSubmit(credentials);
    }
  };

  return (
    <Form>
      <Input
        placeHolder="User name"
        name="name"
        focused={true}
        onHandleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          handleChange(e, 'name')
        }
      />
      <Input
        placeHolder="Email Address"
        name="email"
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
      <Input
        placeHolder="Confirm Password"
        name="password2"
        type="password"
        onHandleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          handleChange(e, 'password2')
        }
      />
      <Button onPress={handleRegister}>
        <Text>Sign Up</Text>
      </Button>
    </Form>
  );
};

export default RegisterForm;
