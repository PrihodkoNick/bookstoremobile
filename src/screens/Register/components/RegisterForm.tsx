import React, {useState, useRef, FC} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput,
} from 'react-native';
import {Form, Item, Input, Button, Text} from 'native-base';
import {showToast} from '../../../utils/showToast';

type CredsType = {
  name: string;
  email: string;
  password: string;
};

interface RegisterFormProps {
  onSubmit: (credentials: CredsType) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  let refName = useRef<TextInput | null>(null);

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
      <Item>
        <Input
          ref={refName}
          autoFocus
          placeholder="User name"
          onChange={(e) => handleChange(e, 'name')}
        />
      </Item>
      <Item>
        <Input placeholder="Email" onChange={(e) => handleChange(e, 'email')} />
      </Item>
      <Item last>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChange={(e) => handleChange(e, 'password')}
        />
      </Item>
      <Item>
        <Input
          placeholder="Confirm password"
          secureTextEntry={true}
          onChange={(e) => handleChange(e, 'password2')}
        />
      </Item>
      <Button block onPress={handleRegister}>
        <Text>Sign Up</Text>
      </Button>
    </Form>
  );
};

export default RegisterForm;
