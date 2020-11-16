import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import 'react-native-gesture-handler';
import {composeWithDevTools} from 'redux-devtools-extension';

import allReducers from './src/reducers';

const middleware = [thunk];

const store = createStore(
  allReducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

import App from './App';
import {name as appName} from './app.json';

export default class NativeBaseRedux extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => NativeBaseRedux);
