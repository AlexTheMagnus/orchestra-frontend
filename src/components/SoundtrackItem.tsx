import React from 'react';
import { StyleSheet } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { SoundtrackItemParamList } from '../types/types';
import BookCover from './BookCover';
import { StackNavigationProp } from '@react-navigation/stack';

const renderBookCover = (bookCover: string) => {
  return <BookCover bookCoverUrl={bookCover} styles={styles.bookCover} />;
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
  const navigation = useNavigation<StackNavigationProp<any>>();

  const openSoundtrackScreen = () => {
    navigation.push('Root', { screen: 'Soundtrack', params: { soundtrackId } });
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
