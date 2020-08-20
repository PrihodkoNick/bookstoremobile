import React, {useState} from 'react';

import {Form, Item, Input, Button, Text} from 'native-base';

const LoginForm = ({onSubmit}) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const {email, password} = credentials;

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

  const checkFields = () => {
    let isValid = true;

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
          placeholder="Email Address"
          onChange={(e) => handleEmailChange(e)}
        />
      </Item>
      <Item last>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChange={(e) => handlePasswordChange(e)}
        />
      </Item>
      <Button block onPress={handleLogin}>
        <Text>Sign In</Text>
      </Button>
    </Form>
  );
};

export default LoginForm;
