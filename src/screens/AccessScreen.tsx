import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
// import LinearGradient from 'expo-linear-gradient';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes
// } from '@react-native-google-signin/google-signin';

import Colors from '../constants/Colors';

const AccessScreen = () => {
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
      {/* <GoogleSigninButton
          style={styles.signInButton}
          size={GoogleSigninButton.Size.Wide}
        /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  accessScreen: {
    backgroundColor: Colors.secondaryColor,
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
    fontWeight: 'bold'
  },
  signInButton: {
    width: 200,
    height: 50
  }
});

export default AccessScreen;
