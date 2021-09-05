import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import OrchestraColors from '../constants/OrchestraColors';
import { OrchestraButtonProps } from '../types/types';

const OrchestraButton = ({
  onPress,
  message,
  propStyles
}: OrchestraButtonProps) => {
  return (
    <Button
      mode="contained"
      color={OrchestraColors.secondaryColor}
      dark={true}
      style={[styles.button, propStyles]}
      labelStyle={styles.buttonText}
      onPress={onPress}
    >
      {message}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    width: '60%'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 10
  }
});

export default OrchestraButton;
