import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Root} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import {loadUser} from './src/actions/auth';

import DrawerNavigator from './src/navigation/DrawerNavigator/DrawerNavigator';

import {IAuth} from './src/types';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

interface AppProps {
  isAuthenticated: boolean;
  loadUser: () => void;
}

const App: FC<AppProps> = ({isAuthenticated, loadUser}) => {
  useEffect(() => {
    const token = getToken();
    if (token) {
      loadUser();
    }
  }, [loadUser]);

  return (
    <Root>
      <NavigationContainer>
        <DrawerNavigator isAuthenticated={isAuthenticated} />
      </NavigationContainer>
    </Root>
  );
};

const mapStateToProps = ({auth}: {auth: IAuth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, {loadUser})(App);
