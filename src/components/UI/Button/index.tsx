import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';

interface CustomButtonProps {
  onPress: () => void;
  isTranspared?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  isTranspared,
  onPress,
}) => {
  const transparent = isTranspared ? styles.button_transparent : null;

  return (
    <Button block style={[styles.button, transparent]} onPress={onPress}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5c6bc0',
  },
  button_transparent: {
    backgroundColor: 'transparent',
  },
});

export default CustomButton;
