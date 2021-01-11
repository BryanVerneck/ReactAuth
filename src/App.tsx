import 'react-native-gesture-handler';

import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';

import Routes from './routes';

const App: React.FC = () => {
  return(
    <NavigationContainer>
      <AuthProvider>
          <Routes />
      </AuthProvider> 
    </NavigationContainer>  
  )
}

registerRootComponent(App);