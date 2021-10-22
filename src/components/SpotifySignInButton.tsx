import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import OrchestraColors from '../constants/OrchestraColors';

const SpotifySignInButton = ({ ...props }) => {
  return (
    <Button
      mode="contained"
      uppercase={false}
      color={OrchestraColors.primaryColor}
      dark={true}
      style={styles.button}
      labelStyle={styles.buttonText}
      {...props}
    >
      <FontAwesome5 name="spotify" size={22} />
      <View style={{ width: 16, height: 1 }} />
      <Text>Sign in with Spotify</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  },
  buttonText: {
    color: OrchestraColors.textColor,
    paddingVertical: 10,
    fontSize: 20,
    paddingHorizontal: 20
  }
});

export default SpotifySignInButton;
