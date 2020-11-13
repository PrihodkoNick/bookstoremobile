import React, {FC, useState} from 'react';
import {connect} from 'react-redux';

import {Container} from 'native-base';
import {View, Image, Button, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {logout} from '../../actions/auth';

import HeaderApp from '../../components/Header/HeaderApp';

interface ProfileProps {
  navigation: any;
  isAuthenticated: boolean;
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

const Profile: FC<ProfileProps> = ({navigation, isAuthenticated, logout}) => {
  const [photo, setPhoto] = useState<ProfileState | {}>({});
  const {
    photo: {uri}
  } = photo;

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto({photo: response});
      }
    });

    console.log('handleChoosePhoto');
  };

  return (
    <Container>
      <HeaderApp
        navigation={navigation}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <View style={styles.imageContainer}>
        {uri && <Image source={{uri: uri}} style={styles.image} />}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </View>
    </Container>
  );
};

const mapStateToProps = ({auth}: {auth: any}) => ({
  isAuthenticated: auth.isAuthenticated,
});

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
});

export default connect(mapStateToProps, {logout})(Profile);
