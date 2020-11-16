import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';

interface CustomButtonProps {
  onPress: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({children, onPress}) => {
  return (
    <Button block style={styles.button} onPress={onPress}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5c6bc0',
  },
});

export default CustomButton;
