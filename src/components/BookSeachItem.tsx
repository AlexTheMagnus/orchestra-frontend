import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { BookSearchItemParamList } from '../types/types';
import BookCover from '../components/BookCover';

const renderBookCover = (bookCover: string) => {
  return <BookCover bookCoverUrl={bookCover} styles={styles.bookCover} />;
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
  bookCover: {
    width: 64,
    height: undefined,
    aspectRatio: 2 / 3
  }
});

export default BookSearchItem;
