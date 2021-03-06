import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { BookSearchItemParamList } from '../types/types';
import BookCover from '../components/BookCover';

const renderBookCover = (bookCover: string) => {
  return <BookCover bookCoverUrl={bookCover} styles={styles.bookCover} />;
};

const BookSearchItem = ({
  bookCover,
  bookTitle,
  author
}: BookSearchItemParamList) => {
  return (
    <List.Item
      title={bookTitle}
      description={author}
      left={() => renderBookCover(bookCover)}
    />
  );
};

const styles = StyleSheet.create({
  bookCover: {
    width: 64,
    height: undefined,
    aspectRatio: 2 / 3
  }
});

export default BookSearchItem;
