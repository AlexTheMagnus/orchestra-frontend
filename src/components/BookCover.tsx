import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

const BookCover = ({
  bookCoverUrl,
  styles
}: {
  bookCoverUrl: string;
  styles: StyleProp<ImageStyle>;
}) => {
  return (
    <Image
      source={
        bookCoverUrl
          ? {
              uri: bookCoverUrl
            }
          : require('../assets/images/book-cover-placeholder.jpeg')
      }
      style={styles}
    />
  );
};

export default BookCover;
