import React, {FC} from 'react';
import {connect} from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

import {logout} from '../../actions/auth';

import TabNavigator from '../TabNavigator/TabNavigator';
import {Login, Register, Profile, Favorites, AddBook} from '../../screens';

interface DrawerNavigatorProps {
  isAuthenticated: boolean;
  logout: () => void;
}

const Drawer = createDrawerNavigator();

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

const DrawerNavigator: FC<DrawerNavigatorProps> = ({
  isAuthenticated,
  logout,
}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent
          isAuthenticated={isAuthenticated}
          onLogout={logout}
          {...props}
        />
      )}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      {isAuthenticated ? (
        <>
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Favorites" component={Favorites} />
          <Drawer.Screen name="AddBook" component={AddBook} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default connect(null, {logout})(DrawerNavigator);
