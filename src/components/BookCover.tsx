import React from 'react';
import { Image } from 'react-native';

const BookCover = ({
  bookCoverUrl,
  styles
}: {
  bookCoverUrl: string;
  styles: Object;
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
