import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import OrchestraColors from '../constants/OrchestraColors';

const CreateSoundtrackButton = ({ ...props }) => {
  return (
    <Button
      mode="contained"
      color={OrchestraColors.secondaryColor}
      dark={true}
      onPress={() => console.log('Pressed')}
      style={styles.button}
      labelStyle={styles.buttonText}
    >
      CREATE SOUNDTRACK
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 10,
    position: 'absolute',
    zIndex: 10,
    width: '75%'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 10
  }
});

export default CreateSoundtrackButton;
