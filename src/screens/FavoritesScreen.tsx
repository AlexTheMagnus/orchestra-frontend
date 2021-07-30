import * as React from 'react';
import { StyleSheet } from 'react-native';

import EmptyView from '../components/EmptyView';
import { View } from '../components/Themed';

const FavoritesScreen = () => {
  const emptyMessage: string =
    'Add soundtracks to favorites to find them easily';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <EmptyView icon="favorites" message={emptyMessage} />
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

export default FavoritesScreen;
