import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
// import LinearGradient from 'expo-linear-gradient';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes
// } from '@react-native-google-signin/google-signin';

import { RootStackParamList } from '../types';
import { env } from '../../.env';
import OrchestraColors from '../constants/OrchestraColors';

// const handleGoogleSignIn = ({
//   navigation
// }: StackScreenProps<RootStackParamList, 'Access'>) => {
//   const config = {
//     androidClientId: env.ANDROID_CLIENT_ID,
//     scopes: ['profile', 'email']
//   };

//   Google.logInAsync(config)
//     .then(result => {
//       const { type, user } = result;

//       if (type == 'success') {
//         const { email, name, photoUrl } = user;

//         console.log('Google sigin was successful');
//         setTimeout(() =>
//           navigation.navigate('Root', { email, name, photoUrl })
//         );
//       } else {
//         console.log('Google sigin was cancelled');
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

const AccessScreen = ({
  navigation
}: StackScreenProps<RootStackParamList, 'Access'>) => {
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
        style={styles.signInButton}
        onPress={() => {
          navigation.navigate('Root');
        }}
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
