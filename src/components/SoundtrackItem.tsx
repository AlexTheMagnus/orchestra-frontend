import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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

const SoundtrackItem = ({
  bookCover,
  soundtrackTitle,
  bookTitle,
  author,
  soundtrackId
}: SoundtrackItemParamList) => {
  const navigation = useNavigation();

  const openSoundtrackScreen = () => {
    navigation.navigate('Soundtrack', { soundtrackId });
  };

  return (
    <TouchableRipple
      onPress={() => openSoundtrackScreen()}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <List.Item
        // key={key}
        title={soundtrackTitle}
        description={bookTitle + ' · by ' + author}
        left={() => renderBookCover(bookCover)}
        right={() => renderOptionsIcon()}
      />
    </TouchableRipple>
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
