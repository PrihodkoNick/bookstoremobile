import {Toast} from 'native-base';

export const showToast = (
  text: string,
  type: 'danger' | 'success' | 'warning',
): void => {
  Toast.show({
    text,
    buttonText: 'Ok',
    duration: 3000,
    type,
  });
};