import React, {useState, FC} from 'react';
import {Text, Form} from 'native-base';
import {View, Image, StyleSheet, TextInput} from 'react-native';
// import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';

import Button from '../../../components/UI/Button';

import {UserType, ImageType} from '../../../types';

interface ProfileFormProps {
  user: UserType;
  onSubmit: (about: string | undefined, photo: ImageType) => void;
}

const options = {
  noData: true,
  quality: 0.6,
};

const ProfileForm: FC<ProfileFormProps> = ({user, onSubmit}) => {
  const [photo, setPhoto] = useState<ImageType>(
    {uri: 'http://192.168.88.62:5000' + user.avatar} || {},
  );

  const [about, setAbout] = useState<string | undefined>(
    user.about || undefined,
  );

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const handleTakePhoto = () => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const handleSave = () => {
    onSubmit(about, photo);
  };

  return (
    <Form style={styles.form}>
      {/* <FastImage
        source={
          photo.uri ? {uri: photo.uri} : require('../../../assets/img/user.png')
        }
        style={styles.image}
      /> */}
      <Image
        source={
          photo.uri ? {uri: photo.uri} : require('../../../assets/img/user.png')
        }
        style={styles.image}
      />
      <Button isTransparent onPress={handleChoosePhoto}>
        <Text style={styles.text}>Choose Photo</Text>
      </Button>
      <Button isTransparent onPress={handleTakePhoto}>
        <Text style={styles.text}>Take a Photo</Text>
      </Button>
      <View style={styles.aboutContainer}>
        <TextInput
          style={styles.about}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setAbout(text)}
          placeholder="Introduce yourself..."
          value={about}
          maxLength={255}
        />
      </View>
      <Button onPress={handleSave}>
        <Text>Save</Text>
      </Button>
    </Form>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#5c6bc0',
    borderRadius: 150,
  },
  button: {
    textDecorationColor: 'red',
  },
  aboutContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  about: {
    flex: 1,
    padding: 10,
    height: 100,
    maxHeight: 100,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#5c6bc0',
    borderRadius: 5,
  },
  text: {
    color: '#5c6bc0',
    fontWeight: '700',
  },
});

export default ProfileForm;
