import React, {FC, useState} from 'react';
import {connect} from 'react-redux';

import {Container, Text} from 'native-base';
import {View, Image, Button, StyleSheet, TextInput, Pressable} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {logout} from '../../actions/auth';

import HeaderApp from '../../components/Header/HeaderApp';

interface ProfileProps {
  navigation: any;
  isAuthenticated: boolean;
  user: any;
  logout: () => void;
}

type PhotoFieldsType = {
  fileName: string;
  fileSize: number;
  height: number;
  isVertical: boolean;
  origURL: string;
  type: string;
  uri: string;
  width: number;
};

type PhotoType = {
  photo?: PhotoFieldsType;
};

interface ProfileState {
  photo?: PhotoType;
}

const Profile: FC<ProfileProps> = ({
  navigation,
  isAuthenticated,
  user,
  logout
}) => {
  const [photo, setPhoto] = useState<ProfileState | {}>({});
  const [about, setAbout] = useState<string | null>(null);

  // const {
  //   photo: {uri},
  // } = photo;

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto({photo: response});
      }
    });
  };

  return (
    <Container>
      <HeaderApp
        navigation={navigation}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <View style={styles.profileContainer}>
        <Text style={styles.greeting}>Welcome, {user.name}!</Text>
        <Image
          source={
            photo.photo
              ? {uri: photo.photo.uri}
              : require('../../assets/img/user.png')
          }
          style={styles.image}
        />

        <Button
          style={styles.choosePhotoButton}
          title="Choose Photo"
          onPress={handleChoosePhoto}
        />
        <View style={styles.aboutContainer}>
          <TextInput
            style={styles.about}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setAbout(text)}
            placeholder="Introduce yourself..."
            value={about}
          />
        </View>
      </View>
    </Container>
  );
};

const mapStateToProps = ({auth}: {auth: any}) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user,
});

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 10,
    fontSize: 20,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'red',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  choosePhotoButton: {
    color: 'violet',
  },
  aboutContainer: {
    flexDirection: 'row',
  },
  about: {
    display: 'flex',
    flex: 1,
    padding: 10,
    height: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'violet',
    borderRadius: 5,
  },
});

export default connect(mapStateToProps, {logout})(Profile);
