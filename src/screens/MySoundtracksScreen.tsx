import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

import EmptyView from '../components/EmptyView';
import SoundtrackItem from '../components/SoundtrackItem';

const MySoundtracksScreen = () => {
  const emptyMessage: string =
    'Touch the button above to create your fisrt soundtrack';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <EmptyView icon="mySoundtracks" message={emptyMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  emptyIcon: {
    margin: 20
  },
  emptyMessage: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  }
});

export default MySoundtracksScreen;
