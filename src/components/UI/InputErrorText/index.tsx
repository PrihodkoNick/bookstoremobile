import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';

const InputErrorText = ({children}: {children: string}) => {
  return <Text style={styles.error}>{children}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: 'crimson',
    fontSize: 12,
    lineHeight: 20,
  },
});

export default InputErrorText;
