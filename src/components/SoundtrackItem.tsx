import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { SoundtrackItemParamList } from '../types/types';

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

const renderOptionsIcon = () => {
  return (
    <List.Icon color="black" icon="dots-vertical" style={styles.optionsIcon} />
  );
};

const SoundtrackItem = ({ ...props }: SoundtrackItemParamList) => {
  const { bookCover, soundtrackTitle, bookTitle, author, soundtrackId } = props;

  return (
    <List.Item
      // key={key}
      title={soundtrackTitle}
      description={bookTitle + ' · by ' + author}
      left={() => renderBookCover(bookCover)}
      right={() => renderOptionsIcon()}
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

export default SoundtrackItem;
