import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

import { BottomTabParamList } from '../types/types';
import SoundtrackInfo from '../components/SoundtrackInfo';
import EmptyView from '../components/EmptyView';

const SoundtrackScreen = ({
  route,
  navigation
}: StackScreenProps<BottomTabParamList, 'Soundtrack'>) => {
  const { soundtrackId } = route.params;
  const emptyMessage: string = 'This soundtrack is currently empty';

  return (
    <View>
      <IconButton
        icon="heart-outline"
        onPress={() => console.log('Corazón')}
        color="black"
        size={30}
        style={styles.favoriteButton}
      />
      <IconButton
        icon="dots-vertical"
        onPress={() => console.log('Opciones')}
        color="black"
        size={30}
        style={styles.optionsButton}
      />
      <SoundtrackInfo
        bookCover="http://books.google.com/books/content?id=yhIRBwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
        soundtrackTitle={soundtrackId}
        bookTitle="Six of crows"
        author="AlexMagnus"
      />
      <View style={styles.emptyViewContainer}>
        <EmptyView icon="mySoundtracks" message={emptyMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    position: 'absolute',
    left: 5,
    top: 20
  },
  optionsButton: {
    position: 'absolute',
    right: 5,
    top: 20
  },
  emptyViewContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SoundtrackScreen;
