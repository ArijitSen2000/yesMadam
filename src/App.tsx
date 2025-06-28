import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './components/navigation/NavigationStack';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';




const App = () => {
  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </>
  );
};

export default App;

