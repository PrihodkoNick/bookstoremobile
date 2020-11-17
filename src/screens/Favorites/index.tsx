import React, {useRef, FC} from 'react';
import {connect} from 'react-redux';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Container, Text} from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';

import {logout} from '../../actions/auth';

import {IAuth} from '../../types';

interface FavoritesProps {
  navigation: any;
  isAuthenticated: boolean;
  logout: () => {};
}

const Favorites: FC<FavoritesProps> = ({
  navigation,
  isAuthenticated,
  logout,
}) => {
  const viewShot = useRef<any>();

  const takeScreenShot = () => {
    console.log(viewShot);

    viewShot.current.capture().then((uri: string) => {
      console.log('do something with ', uri);
      CameraRoll.save(uri);
    });
  };

  return (
    <Container>
      <View style={styles.container}>
        <ViewShot
          style={styles.shotContainer}
          ref={viewShot}
          options={{format: 'jpg', quality: 0.9}}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../../assets/img/mountains.jpeg')}>
            <Text style={styles.text}>Some text</Text>
            <QRCode value="http://facebook.github.io/react-native/" />
          </ImageBackground>
        </ViewShot>
        <TouchableOpacity style={styles.buttonStyle} onPress={takeScreenShot}>
          <Text style={styles.buttonTextStyle}>Take Screenshot</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const mapStateToProps = ({auth}: {auth: IAuth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

const styles = StyleSheet.create({
  shotContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, {logout})(Favorites);
