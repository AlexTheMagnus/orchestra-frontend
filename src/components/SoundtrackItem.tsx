import React from 'react';
import { StyleSheet } from 'react-native';
import { List, TouchableRipple, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { SoundtrackItemParamList } from '../types/types';
import BookCover from './BookCover';
import { StackNavigationProp } from '@react-navigation/stack';

const renderBookCover = (bookCover: string) => {
  return <BookCover bookCoverUrl={bookCover} styles={styles.bookCover} />;
};

const renderOptionsIcon = (soundtrackInfo: SoundtrackItemParamList) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <IconButton
      icon="dots-vertical"
      onPress={() =>
        navigation.navigate(
          // 'as never' is being used to avoid the 'type string is not assignable to never' error
          // This error occurs due to a ts error. There is an open issue to fix it
          'Modal' as never,
          {
            screen: 'SoundtrackOptions',
            params: { ...soundtrackInfo }
          } as never
        )
      }
      color="black"
      size={30}
      style={styles.optionsIcon}
    />
  );
};

const SoundtrackItem = ({
  bookCover,
  soundtrackTitle,
  bookTitle,
  authorId,
  authorName,
  soundtrackId
}: SoundtrackItemParamList) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const description =
    (bookTitle ?? '') +
    (bookTitle && authorName ? ' · ' : '') +
    (authorName ? 'by ' + authorName : '');

  const openSoundtrackScreen = () => {
    navigation.push('Root', {
      screen: 'Soundtrack',
      params: { soundtrackId }
    });
  };

  return (
    <TouchableRipple
      onPress={() => openSoundtrackScreen()}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <List.Item
        title={soundtrackTitle ?? ''}
        description={description}
        left={() => renderBookCover(bookCover)}
        right={() =>
          renderOptionsIcon({
            bookCover,
            soundtrackTitle,
            bookTitle,
            authorId,
            authorName,
            soundtrackId
          })
        }
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
