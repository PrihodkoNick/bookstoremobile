import React, {FC, useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface InputProps {
  placeHolder: string;
  secureField?: boolean;
  focused?: boolean;
  value: string;
  onChangeText: (e: string) => void;
}

const Input: FC<InputProps> = ({
  placeHolder,
  secureField,
  value,
  focused,
  onChangeText,
}) => {
  const inputProps = {
    autoFocus: focused,
    secureTextEntry: secureField,
  };
  const [style, setStyle] = useState(styles.input_unfocused);

  const handleBlur = () => {
    setStyle(styles.input_unfocused);
  };

  const handleFocus = () => {
    setStyle(styles.input_focused);
  };

  return (
    <TextInput
      {...inputProps}
      autoCapitalize="none"
      placeholder={placeHolder}
      value={value}
      onChangeText={onChangeText}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={[styles.input, style]}
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
    width: '100%',
  },
  input_focused: {
    borderColor: '#5c6bc0',
  },
  input_unfocused: {
    borderColor: '#ccc',
  },
});

export default Input;
