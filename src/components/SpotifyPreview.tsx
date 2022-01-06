import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle
} from 'react-native';
import WebView from 'react-native-webview';

const SpotifyPreview = ({
  themeUri,
  style
}: {
  themeUri: string;
  style: StyleProp<ViewStyle & ImageStyle>;
}) => {
  const [loadPreview, setLoadPreview] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadPreview(true);
    }, 500);
  });

  return loadPreview ? (
    <WebView
      style
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      originWhitelist={['*']}
      source={{
        html: `<head><meta name="viewport" content="width=device-width, initial-scale=1"></meta><head/><iframe src="https://open.spotify.com/embed/track/${themeUri}" width="80" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
      }}
    />
  ) : (
    <Image
      source={require('../assets/images/theme-cover-placeholder.png')}
      style={[styles.placeholder]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    width: 80,
    height: 80,
    margin: 10
  }
});

export default SpotifyPreview;
