import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

import { SoundtrackInfoParamList } from '../types/types';

const SoundtrackInfo = ({
  bookCover,
  soundtrackTitle,
  bookTitle,
  author
}: SoundtrackInfoParamList) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: bookCover
        }}
        style={styles.bookCover}
      ></Image>
      <View style={styles.bookTextInfo}>
        <Title>{soundtrackTitle}</Title>
        <Text>
          {bookTitle} · by {author}
        </Text>
      </View>
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
