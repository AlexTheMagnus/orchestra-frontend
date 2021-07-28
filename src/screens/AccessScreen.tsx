import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

import { RootStackParamList } from '../types';
import { env } from '../../.env';
import OrchestraColors from '../constants/OrchestraColors';
import { Prompt } from 'expo-auth-session';

const AccessScreen = ({
  navigation
}: StackScreenProps<RootStackParamList, 'Access'>) => {
  const expoClientId = `508188356154-frtsvubeuj37hbtn2k4ivp9in5o9lmad`;
  const androidClientId = `508188356154-tim0ltfoft800n8o3f53q7ish55850fq`;
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: `${expoClientId}.apps.googleusercontent.com`,
    androidClientId: `${androidClientId}.apps.googleusercontent.com`,
    prompt: Prompt.Login
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { params } = response;
      console.log(params);
      navigation.push('Root');
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
