import React, {FC, useState} from 'react';
import {connect} from 'react-redux';

import {Container, Text} from 'native-base';
import {View, Image, StyleSheet, TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {logout} from '../../actions/auth';

import Button from '../../components/UI/Button';

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

const Profile: FC<ProfileProps> = ({user}) => {
  const [photo, setPhoto] = useState<ProfileState | {}>({});
  const [about, setAbout] = useState<string | undefined>(undefined);

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
        <Button isTranspared onPress={handleChoosePhoto}>
          <Text style={styles.text}>Choose Photo</Text>
        </Button>
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
    borderWidth: 1,
    borderColor: '#5c6bc0',
    borderRadius: 150,
  },
  button: {
    textDecorationColor: 'red',
  },
  aboutContainer: {
    flexDirection: 'row',
  },
  about: {
    display: 'flex',
    flex: 1,
    padding: 10,
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

export default connect(mapStateToProps, {logout})(Profile);
