import {Platform} from 'react-native';

import {ImageType} from '../types';

export const createFormData = (photo: ImageType, about: string | undefined) => {
  const data = new FormData();

  data.append('avatar', {
    name: photo.fileName || 'picture.jpg',
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file:/', ''),
  });

  data.append('about', about);

  return data;
};
