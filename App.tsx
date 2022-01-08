import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { UserParamList, GlobalState } from './src/types/types';
import AppContext from './AppContext';
import Navigation from './src/navigation';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<UserParamList>({
    id: '',
    username: '',
    avatar: ''
  });
  const [loggedUserFavorites, setLoggedUserFavorites] = useState<
    string[] | null
  >(null);

  const cleanSessionData = () => {
    globalState.setLoggedUser({
      id: '',
      username: '',
      avatar: ''
    });
    globalState.setAccessToken(null);
    globalState.setLoggedUserFavorites(null);
  };

  const globalState: GlobalState = {
    accessToken,
    setAccessToken,
    loggedUser,
    setLoggedUser,
    loggedUserFavorites,
    setLoggedUserFavorites,
    cleanSessionData
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider value={globalState}>
        <PaperProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </AppContext.Provider>
    );
  }
};

export default App;
