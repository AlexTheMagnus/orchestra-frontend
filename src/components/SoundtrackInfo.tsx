import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

import { SoundtrackInfoParamList } from '../types/types';
import BookCover from '../components/BookCover';

const SoundtrackInfo = ({
  bookCover,
  soundtrackTitle,
  bookTitle,
  author
}: SoundtrackInfoParamList) => {
  return (
    <View style={styles.container}>
      <BookCover bookCoverUrl={bookCover} styles={styles.bookCover} />

      {soundtrackTitle && bookTitle && author ? (
        <View style={styles.bookTextInfo}>
          <Title>{soundtrackTitle}</Title>
          <Text>
            {bookTitle} · by {author}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookTextInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  bookCover: {
    width: '40%',
    height: undefined,
    aspectRatio: 2 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  }
});

export default SoundtrackInfo;
