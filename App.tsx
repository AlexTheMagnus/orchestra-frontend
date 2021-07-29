import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import React, { useState } from 'react';

import AppContext from './AppContext';
import { LoggedUserParamList } from './src/types/types';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [loggedUser, setLoggedUser] = useState<LoggedUserParamList>({
    id: '',
    given_name: '',
    picture: ''
  });

  const userSettings = { loggedUser, setLoggedUser };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider value={userSettings}>
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
