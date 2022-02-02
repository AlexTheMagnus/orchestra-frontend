import React, { useContext, useEffect } from 'react';
import { SPOTIFY_CLIENT_ID, LOCAL_ORCHESTRA_URL, BACKEND_URL } from '@env';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import { useFonts, Tangerine_700Bold } from '@expo-google-fonts/tangerine';

import { getUserFavoritesRequest } from '../components/utils';
import { LinearGradient } from 'expo-linear-gradient';
import {
  SPOTIFY_AUTH_ENDPOINT,
  SPOTIFY_TOKEN_ENDPOINT
} from '../constants/OrchestraConstants';
import { StackParamList, AccessResponse } from '../types/types';
import AppContext from '../../AppContext';
import OrchestraColors from '../constants/OrchestraColors';
import SpotifySignInButton from '../components/SpotifySignInButton';
import AppLoading from 'expo-app-loading';

// Endpoint
const discovery = {
  authorizationEndpoint: SPOTIFY_AUTH_ENDPOINT,
  tokenEndpoint: SPOTIFY_TOKEN_ENDPOINT
};

const AccessScreen = ({
  navigation
}: StackScreenProps<StackParamList, 'Access'>) => {
  const globalState = useContext(AppContext);
  const redirectUri = String(LOCAL_ORCHESTRA_URL);

  let [fontsLoaded] = useFonts({
    Tangerine_700Bold
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ['user-read-email', 'user-read-private'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      sendAccessRequest(code).then(accessResponse => {
        if (!accessResponse.ok) {
          handleErrorResponse(accessResponse);
          return;
        }

        accessResponse.json().then(responseBody => {
          setUserInfoOnLogin(responseBody);
          getUserFavoritesRequest(responseBody.user_id).then(userFavorites =>
            globalState.setLoggedUserFavorites(
              userFavorites.favorite_soundtracks_list
            )
          );
        });
        console.info('Successful login!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Root' }]
        });
      });
    }
  }, [response]);

  const sendAccessRequest = async (code: string): Promise<Response> =>
    await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_code: code
      })
    });

  const handleErrorResponse = (response: Response) => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Access' }]
    });
    const message = `An error has occured: Status error ${response.status}`;
    alert(message);
    console.error(message);
  };

  const setUserInfoOnLogin = async (accessResponse: AccessResponse) => {
    globalState.setAccessToken(accessResponse.access_token);
    globalState.setLoggedUser({
      id: accessResponse.user_id,
      username: accessResponse.username,
      avatar: accessResponse.user_avatar
    });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.accessScreen}>
        <LinearGradient
          colors={[
            OrchestraColors.secondaryColor,
            OrchestraColors.secondaryColorDark
          ]}
          style={styles.gradient}
        />
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require('../assets/images/orchestra-icon.png')}
          />
          <Text style={styles.logoText}>Orchestra</Text>
          <Text style={styles.logoSubTitle}>
            Conduct your books' soundtracks
          </Text>
        </View>
        <View>
          <SpotifySignInButton
            disabled={!request}
            onPress={() => promptAsync()}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  accessScreen: {
    backgroundColor: OrchestraColors.secondaryColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-evenly'
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  logoView: {
    alignItems: 'center'
  },
  logo: {
    width: '70%',
    height: undefined,
    aspectRatio: 1
  },
  logoText: {
    color: 'black',
    fontSize: 80,
    fontFamily: 'Tangerine_700Bold'
  },
  logoSubTitle: {
    color: 'black',
    fontSize: 20
  }
});

export default AccessScreen;
