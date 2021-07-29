import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { Prompt } from 'expo-auth-session';
import { StackScreenProps } from '@react-navigation/stack';
import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';

import { RootStackParamList } from '../types/types';
import OrchestraColors from '../constants/OrchestraColors';
import AppContext from '../../AppContext';

const AccessScreen = ({
  navigation
}: StackScreenProps<RootStackParamList, 'Access'>) => {
  const myContext = useContext(AppContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: `${EXPO_CLIENT_ID}.apps.googleusercontent.com`,
    androidClientId: `${ANDROID_CLIENT_ID}.apps.googleusercontent.com`,
    prompt: Prompt.Login,
    scopes: ['openid', 'https://www.googleapis.com/auth/userinfo.profile']
  });

  const getGoogleUserProfileInfo = async (access_token: string) => {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' +
        access_token
    );

    if (!response.ok) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Access' }]
      });
      const message = `An error has occured: Status error ${response.status}`;
      console.error(message);
      return;
    }

    console.log('Success login request');
    const json = await response.json();
    const user = {
      id: json.id,
      given_name: json.given_name,
      picture: json.picture
    };
    myContext.setLoggedUser(user);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { params } = response;
      const access_token = params.access_token;
      getGoogleUserProfileInfo(access_token);
    }
  }, [response]);

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
      <TouchableOpacity
        disabled={!request}
        style={styles.signInButton}
        onPress={() => promptAsync()}
      >
        <Text style={styles.logoSubTitle}>Google Sign In</Text>
      </TouchableOpacity>
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
  },
  signInButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});

export default AccessScreen;
