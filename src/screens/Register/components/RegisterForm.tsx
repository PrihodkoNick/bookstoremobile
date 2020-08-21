import React, {useState} from 'react';

import {Form, Item, Input, Button, Text} from 'native-base';

const RegisterForm = ({onSubmit}) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const {name, email, password, password2} = credentials;

  const handleNameChange = (e) => {
    setCredentials({
      ...credentials,
      name: e.nativeEvent.text,
    });
  };

  const handleEmailChange = (e) => {
    setCredentials({
      ...credentials,
      email: e.nativeEvent.text,
    });
  };

  const handlePasswordChange = (e) => {
    setCredentials({
      ...credentials,
      password: e.nativeEvent.text,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setCredentials({
      ...credentials,
      password2: e.nativeEvent.text,
    });
  };

  const checkFields = () => {
    let isValid = true;

    if (name.trim().length === 0) {
      // setAlert("Please enter a valid name", "danger");
      console.log('Please enter a valid name');
      isValid = false;
    }

    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) {
      // setAlert("Please include a valid email", "danger");
      console.log('Please include a valid email');
      isValid = false;
    }

    if (password.length < 6) {
      // setAlert("Please enter a password with 6 or more characters", "danger");
      console.log('Please enter a password with 6 or more characters');
      isValid = false;
    }

    if (password !== password2) {
      // setAlert("Passwords do not match", "danger");
      console.log('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = () => {
    const isAllValid = checkFields();
    if (isAllValid) {
      const creds = {name, email, password};
      onSubmit(creds);
    }
  };

  return (
    <Form>
      <Item>
        <Input placeholder="User name" onChange={(e) => handleNameChange(e)} />
      </Item>
      <Item>
        <Input placeholder="Email" onChange={(e) => handleEmailChange(e)} />
      </Item>
      <Item last>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChange={(e) => handlePasswordChange(e)}
        />
      </Item>
      <Item>
        <Input
          placeholder="Confirm password"
          secureTextEntry={true}
          onChange={(e) => handleConfirmPasswordChange(e)}
        />
      </Item>
      <Button block onPress={handleRegister}>
        <Text>Sign Up</Text>
      </Button>
    </Form>
  );
};

export default RegisterForm;
