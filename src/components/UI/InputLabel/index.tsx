import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';

const InputLabel = ({label}: {label: string}) => {
  return <Text style={styles.label}>{label}</Text>;
};

const styles = StyleSheet.create({
  label: {
    color: '#5c6bc0',
    marginBottom: 5,
  },
});

export default InputLabel;
