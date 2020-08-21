import React, {useEffect} from 'react';
import {connect, batch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {loadUser} from './src/actions/auth';

import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import Profile from './src/screens/Profile/Profile';
import Favorites from './src/screens/Favorites/Favorites';

const Drawer = createDrawerNavigator();

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

const App = ({isAuthenticated, loadUser}) => {
  useEffect(() => {
    const token = getToken();
    if (token) {
      batch(() => {
        loadUser();
        // loadFavorites();
      });
    }
  }, [loadUser]);

  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          {!isAuthenticated ? (
            <>
              <Drawer.Screen name="Login" component={Login} />
              <Drawer.Screen name="Register" component={Register} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Profile" component={Profile} />
              <Drawer.Screen name="Favorites" component={Favorites} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, {loadUser})(App);
