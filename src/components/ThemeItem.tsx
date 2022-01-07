import React from 'react';
import { List, TouchableRipple } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { ThemeItemParamList } from '../types/types';
import { View } from './Themed';
import SpotifyPreview from './SpotifyPreview';

const ThemeItem = ({
  title,
  author,
  themeUri,
  onPress
}: ThemeItemParamList) => {
  return (
    <View style={styles.container}>
      <SpotifyPreview themeUri={themeUri} style={styles.spotifyPreview} />
      <TouchableRipple
        style={styles.itemBody}
        onPress={onPress}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <List.Item title={title} description={author}></List.Item>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    height: 95
  },
  spotifyPreview: {
    flex: 1
  },
  itemBody: {
    flex: 3
  }
});

export default ThemeItem;
