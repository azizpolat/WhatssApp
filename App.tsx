import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/router/rootNavigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
