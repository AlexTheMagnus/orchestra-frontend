import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParamList } from '../types/types';
import { View } from './Themed';

const FullScreenModal = ({
  navigation
}: StackScreenProps<StackParamList, 'SoundtrackOptions'>) => {
  return (
    <TouchableRipple
      style={styles.fullScreenContainer}
      onPress={() => navigation.goBack()}
      rippleColor="transparent"
    >
      <View style={styles.fullScreenContainerWithCenteredContent}></View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    display: 'flex'
  },
  fullScreenContainerWithCenteredContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default FullScreenModal;
