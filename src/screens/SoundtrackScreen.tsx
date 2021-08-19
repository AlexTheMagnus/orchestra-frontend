import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabParamList } from '../types/types';
import {
  blue100,
  yellow100
} from 'react-native-paper/lib/typescript/styles/colors';

const SoundtrackScreen = ({
  navigation
}: StackScreenProps<BottomTabParamList, 'Soundtrack'>) => {
  return (
    <View style={styles.container}>
      <View style={styles.yellow}>
        <Text>Hi boys!!!</Text>
      </View>
      <View style={styles.blue}>
        <Text>Hi girls!!!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  yellow: {
    backgroundColor: 'yellow',
    textAlign: 'center'
  },
  blue: { backgroundColor: 'cyan' }
});

export default SoundtrackScreen;
