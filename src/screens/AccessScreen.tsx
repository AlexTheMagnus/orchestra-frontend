import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import { StackScreenProps } from '@react-navigation/stack';
import { SPOTIFY_CLIENT_ID, LOCAL_ORCHESTRA_URL, BACKEND_URL } from '@env';

import { StackParamList, AccessResponse } from '../types/types';
import {
  SPOTIFY_AUTH_ENDPOINT,
  SPOTIFY_TOKEN_ENDPOINT
} from '../constants/OrchestraConstants';
import OrchestraColors from '../constants/OrchestraColors';
import AppContext from '../../AppContext';
import SpotifySignInButton from '../components/SpotifySignInButton';
import { getUserFavoritesRequest } from '../components/utils';

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

  return (
    <View style={styles.accessScreen}>
      <View style={styles.logoView}>
        <Image
          style={styles.logo}
          source={require('../assets/images/orchestra-icon.png')}
        />
        <Text style={styles.logoText}>Orchestra</Text>
        <Text style={styles.logoSubTitle}>Conduct your book's soundtracks</Text>
      </View>
      <View>
        <SpotifySignInButton
          disabled={!request}
          onPress={() => promptAsync()}
        />
      </View>
    </View>
  );
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
  logoView: {
    alignItems: 'center'
  },
  logo: {
    padding: 140,
    width: 230,
    height: 175
  },
  logoText: {
    color: 'black',
    marginTop: 10,
    fontSize: 50,
    fontWeight: 'bold'
  },
  logoSubTitle: {
    color: 'black',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
});

export default AccessScreen;
