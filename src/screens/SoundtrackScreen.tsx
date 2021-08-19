import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/types';

const SoundtrackScreen = ({
  navigation
}: StackScreenProps<StackParamList, 'Soundtrack'>) => {
  return (
    <View style={styles.container}>
      <Text>Hi boys!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SoundtrackScreen;
