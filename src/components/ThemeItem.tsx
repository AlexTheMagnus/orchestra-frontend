import React from 'react';
import WebView from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ThemeItemParamList } from '../types/types';
import { View } from './Themed';

const SpotifyPreview = ({ themeUri }: { themeUri: string }) => {
  return (
    <WebView
      style={styles.spotifyPreview}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      originWhitelist={['*']}
      source={{
        html: `<head><meta name="viewport" content="width=device-width, initial-scale=1"></meta><head/><iframe src="https://open.spotify.com/embed/track/${themeUri}" width="80" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
      }}
    />
  );
};

const ThemeItem = ({
  title,
  description,
  themeUri,
  onPress
}: ThemeItemParamList) => {
  // const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <SpotifyPreview themeUri={themeUri} />
      <TouchableRipple
        style={styles.itemBody}
        onPress={onPress}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <List.Item title={title} description={description}></List.Item>
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
