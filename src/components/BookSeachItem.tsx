import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { BookSearchItemParamList } from '../types/types';

const renderBookCover = (bookCover: string) => {
  if (bookCover) {
    return (
      <Image
        source={{
          uri: bookCover
        }}
        style={styles.bookCover}
      />
    );
  } else {
    return (
      <Image
        source={require('../assets/images/book-cover-placeholder.jpeg')}
        style={styles.bookCover}
      />
    );
  }
};

const BookSearchItem = ({ ...props }: BookSearchItemParamList) => {
  const { bookCover, bookTitle, author, key } = props;

  return (
    <List.Item
      title={bookTitle}
      description={author}
      key={key}
      left={() => renderBookCover(bookCover)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  bookCover: {
    width: 64,
    height: undefined,
    aspectRatio: 2 / 3
  },
  optionsIcon: {
    alignSelf: 'center'
  }
});

export default BookSearchItem;
