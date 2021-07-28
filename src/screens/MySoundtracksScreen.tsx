import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

import EmptyView from '../components/EmptyView';
import CreateSoundtrackButton from '../components/CreateSoundtrackButton';
import SoundtrackItemList from '../components/SoundtrackItemList';

const MySoundtracksScreen = () => {
  const emptyMessage: string =
    'Touch the button above to create your fisrt soundtrack';

  const isMySoundtracksEmpty = false;

  return (
    <View style={styles.screeenContainer}>
      <CreateSoundtrackButton />
      {isMySoundtracksEmpty ? (
        <View style={styles.content}>
          <EmptyView icon="mySoundtracks" message={emptyMessage} />
        </View>
      ) : (
        <View style={styles.mySoundtrackListContainer}>
          <SoundtrackItemList />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screeenContainer: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  mySoundtrackListContainer: {
    flex: 1,
    width: '100%'
  },
  emptyMessage: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  }
});

export default MySoundtracksScreen;
