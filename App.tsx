import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {Root} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import {loadUser} from './src/actions/auth';
import {loadCategories} from './src/actions/books';
import {getToken} from './src/utils/getToken';

import DrawerNavigator from './src/navigation/DrawerNavigator/DrawerNavigator';

import {IAuth} from './src/types';

interface AppProps {
  isAuthenticated: boolean;
  loadUser: () => void;
  loadCategories: () => void;
}

const App: FC<AppProps> = ({isAuthenticated, loadUser, loadCategories}) => {
  useEffect(() => {
    const token = getToken();
    if (token) {
      loadUser();
    }
    loadCategories();
  }, [loadUser, loadCategories]);

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

export default connect(mapStateToProps, {loadUser, loadCategories})(App);
