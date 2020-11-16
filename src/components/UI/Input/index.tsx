import React, {FC, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

interface InputProps {
  placeHolder: string;
  name: string;
  type?: string;
  focused?: boolean;
  onHandleChange: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ) => void;
}

const Input: FC<InputProps> = ({
  placeHolder,
  name,
  type,
  focused,
  onHandleChange,
}) => {
  const autoFocusProp = focused ? {autoFocus: true} : null;
  const inputType = type ? {secureTextEntry: true} : null;
  const [style, setStyle] = useState(styles.input_unfocused);

  const handleBlur = () => {
    setStyle(styles.input_unfocused);
  };

  const handleFocus = () => {
    setStyle(styles.input_focused);
  };

  return (
    <TextInput
      autoCapitalize="none"
      placeholder={placeHolder}
      onChange={(e) => onHandleChange(e, name)}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={[styles.input, style]}
      {...autoFocusProp}
      {...inputType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 6,
  },
  input_focused: {
    borderColor: '#5c6bc0',
  },
  input_unfocused: {
    borderColor: '#ccc',
  },
});

export default Input;
