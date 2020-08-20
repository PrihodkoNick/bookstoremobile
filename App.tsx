import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
