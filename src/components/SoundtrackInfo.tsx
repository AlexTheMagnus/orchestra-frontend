import React from 'react';
import { Text, Title } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { SoundtrackInfoParamList } from '../types/types';
import BookCover from '../components/BookCover';
import OrchestraColors from '../constants/OrchestraColors';
import useColorScheme from '../hooks/useColorScheme';

const SoundtrackInfo = ({
  bookCover,
  soundtrackTitle,
  bookTitle,
  authorName
}: SoundtrackInfoParamList) => {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <BookCover bookCoverUrl={bookCover} styles={styles.bookCover} />

      <View style={styles.bookTextInfo}>
        <Title>{soundtrackTitle ?? ''}</Title>
        <Text
          style={[
            { color: OrchestraColors[theme].secondaryText },
            styles.bookDescription
          ]}
        >
          {bookTitle ?? ''} {bookTitle && authorName && '·'}
          {authorName && ` by ${authorName}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookDescription: { textAlign: 'center' },
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
