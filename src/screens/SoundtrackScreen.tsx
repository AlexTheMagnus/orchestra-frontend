import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { BACKEND_URL } from '@env';

import { BottomTabParamList, SoundtrackItemParamList } from '../types/types';
import { fromJsonToSoundtrackItem } from '../components/utils';
import SoundtrackInfo from '../components/SoundtrackInfo';
import EmptyView from '../components/EmptyView';

const SoundtrackScreen = ({
  route,
  navigation
}: StackScreenProps<BottomTabParamList, 'Soundtrack'>) => {
  const { soundtrackId } = route.params;
  const emptyMessage: string = 'This soundtrack is currently empty';
  const defaultSoundtrackInfo = {
    bookCover: '',
    soundtrackTitle: '',
    bookTitle: '',
    author: '',
    soundtrackId: soundtrackId
  };

  const [soundtrackInfo, setSoundtrackInfo] =
    React.useState<SoundtrackItemParamList>(defaultSoundtrackInfo);

  useEffect(() => {
    getSoundtrackById(soundtrackId).then(soundtrack => {
      setSoundtrackInfo(soundtrack);
    });
  }, []);

  const getSoundtrackById = async (soundtrackId: string) => {
    const response = await fetch(`${BACKEND_URL}/soundtracks/${soundtrackId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const message = `An error has occured while loading the soundtrack info: Status error ${response.status}`;
      alert(message);
      console.error(message);
    }

    const json = await response.json();
    const soundtrackItem = await fromJsonToSoundtrackItem(json);

    return soundtrackItem;
  };

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
        bookCover={soundtrackInfo.bookCover}
        soundtrackTitle={soundtrackInfo.soundtrackTitle}
        bookTitle={soundtrackInfo.bookTitle}
        author={soundtrackInfo.author}
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
