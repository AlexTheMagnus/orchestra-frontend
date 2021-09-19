import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import { StackScreenProps } from '@react-navigation/stack';
import { SPOTIFY_CLIENT_ID, LOCAL_ORCHESTRA_URL, BACKEND_URL } from '@env';

import { StackParamList, LoggedUserParamList } from '../types/types';
import {
  SPOTIFY_AUTH_ENDPOINT,
  SPOTIFY_TOKEN_ENDPOINT
} from '../constants/OrchestraConstants';
import OrchestraColors from '../constants/OrchestraColors';
import AppContext from '../../AppContext';
import GoogleSignInButton from '../components/GoogleSignInButton';

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
      scopes: [
        'user-read-email',
        'user-read-private',
        'streaming',
        'app-remote-control',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing'
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Success loggin', code);
    } else {
      console.log('Error when logging in', response);
    }
  }, [response]);

  const handleErrorResponse = (response: Response) => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Access' }]
    });
    const message = `An error has occured: Status error ${response.status}`;
    alert(message);
    console.error(message);
  };

  const registerUser = async (user: LoggedUserParamList) => {
    return await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        username: user.given_name,
        user_avatar: user.picture
      })
    });
  };

  const getGoogleUserProfileInfo = async (access_token: string) => {
    const googleResponse = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' +
        access_token
    );

    if (!googleResponse.ok) {
      handleErrorResponse(googleResponse);
      return;
    }

    const json = await googleResponse.json();
    const user = {
      id: json.id,
      given_name: json.given_name,
      picture: json.picture
    };

    const registerResponse = await registerUser(user);

    if (!registerResponse.ok && registerResponse.status !== 409) {
      handleErrorResponse(registerResponse);
      return;
    }

    console.log('Success login request');
    globalState.setLoggedUser(user);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
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
        <GoogleSignInButton disabled={!request} onPress={() => promptAsync()} />
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
