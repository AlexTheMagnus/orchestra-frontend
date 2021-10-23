import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParamList } from '../types/types';
import { View } from './Themed';
import SoundtrackInfo from './SoundtrackInfo';

const TextButton = ({
  message,
  onPress
}: {
  message: string;
  onPress: () => void;
}) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>
        {message}
      </Text>
    </TouchableRipple>
  );
};

const SoundtrackOptionsModal = ({
  navigation
}: StackScreenProps<StackParamList, 'SoundtrackOptions'>) => {
  return (
    <TouchableRipple
      style={styles.fullScreenContainer}
      onPress={() => navigation.goBack()}
      rippleColor="transparent"
    >
      <View style={styles.fullScreenContainerWithCenteredContent}>
        <SoundtrackInfo
          bookCover={''}
          soundtrackTitle={'soundtrackInfo.soundtrackTitle'}
          bookTitle={'soundtrackInfo.bookTitle'}
          author={'soundtrackInfo.author'}
        />
        <TextButton message="Change title" onPress={() => {}} />
        <TextButton message="Change book" onPress={() => {}} />
        <TextButton message="Add to favorites" onPress={() => {}} />
        <TextButton message="Go to author" onPress={() => {}} />
        <TextButton message="Delete" onPress={() => {}} />
      </View>
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

export default SoundtrackOptionsModal;
