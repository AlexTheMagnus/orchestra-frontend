import 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-community/google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import React, { useEffect } from 'react';

import { env } from './.env';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

const App = () => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: env.WEB_CLIENT_ID,
  //     offlineAccess: true,
  //     forceCodeForRefreshToken: true
  //   });
  // });

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
};

export default App;
