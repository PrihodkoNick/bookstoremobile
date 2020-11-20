import React from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Home,
  Login,
  Register,
  Profile,
  Favorites,
  AddBook,
} from '../../screens';

import {IAuth} from '../../types';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({isAuthenticated}: {isAuthenticated: boolean}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'enter' : 'enter-outline';
          } else if (route.name === 'Register') {
            iconName = focused ? 'body' : 'body-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Add book') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      {isAuthenticated ? (
        <>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Favorites" component={Favorites} />
          <Tab.Screen name="Add book" component={AddBook} />
        </>
      ) : (
        <>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Register" component={Register} />
        </>
      )}
    </Tab.Navigator>
  );
};

const mapStateToProps = ({auth}: {auth: IAuth}) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps)(BottomTabNavigator);
