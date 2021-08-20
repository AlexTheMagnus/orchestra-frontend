import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import SoundtrackInfo from '../components/SoundtrackInfo';

import { BottomTabParamList } from '../types/types';

const SoundtrackScreen = ({
  navigation
}: StackScreenProps<BottomTabParamList, 'Soundtrack'>) => {
  return (
    <SoundtrackInfo
      bookCover="http://books.google.com/books/content?id=01lAtAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
      soundtrackTitle="El sonido de los Cuervos"
      bookTitle="Crooked kingdom"
      author="AlexMagnus"
    />
  );
};

export default SoundtrackScreen;
