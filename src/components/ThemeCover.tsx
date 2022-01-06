import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

const ThemeCover = ({
  sourceUrl,
  styles
}: {
  sourceUrl: string;
  styles: StyleProp<ImageStyle>;
}) => {
  return (
    <Image
      source={
        !sourceUrl
          ? {
              uri: sourceUrl
            }
          : require('../assets/images/theme-cover-placeholder.png')
      }
      style={styles}
    />
  );
};

export default ThemeCover;
