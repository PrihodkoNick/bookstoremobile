import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Root} from 'native-base';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';

import {loadUser, logout} from './src/actions/auth';

import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import Profile from './src/screens/Profile/Profile';

const Drawer = createDrawerNavigator();

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

interface AppProps {
  isAuthenticated: boolean;
  loadUser: () => void;
  logout: () => void;
}

const userLogout = async (navigation: any, onLogout: () => void) => {
  await AsyncStorage.removeItem('token');
  await onLogout();
  navigation.navigate('Home');
};

function CustomDrawerContent(props: any) {
  const {navigation, isAuthenticated, onLogout} = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isAuthenticated ? (
        <DrawerItem
          label="Logout"
          onPress={() => userLogout(navigation, onLogout)}
        />
      ) : null}
    </DrawerContentScrollView>
  );
}

const App: FC<AppProps> = ({isAuthenticated, loadUser, logout}) => {
  useEffect(() => {
    const token = getToken();
    if (token) {
      loadUser();
    }
  }, [loadUser]);

  return (
    <Root>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => (
            <CustomDrawerContent
              isAuthenticated={isAuthenticated}
              onLogout={logout}
              {...props}
            />
          )}>
          <Drawer.Screen name="Home" component={Home} />
          {!isAuthenticated ? (
            <>
              <Drawer.Screen name="Login" component={Login} />
              <Drawer.Screen name="Register" component={Register} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Profile" component={Profile} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </Root>
  );
};

const mapStateToProps = ({auth}: {auth: any}) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, {loadUser, logout})(App);
