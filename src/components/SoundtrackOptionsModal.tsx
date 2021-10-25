import React, { useContext } from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParamList } from '../types/types';
import SoundtrackInfo from './SoundtrackInfo';
import FullScreenModal from './FullScreenModal';
import AppContext from '../../AppContext';
import { View } from 'react-native';

const TextButton = ({
  message,
  onPress
}: {
  message: string;
  onPress: () => void;
}) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>
        {message}
      </Text>
    </TouchableRipple>
  );
};

const SoundtrackOptionsModal = ({
  route,
  navigation
}: StackScreenProps<StackParamList, 'SoundtrackOptions'>) => {
  const globalState = useContext(AppContext);
  console.log('Params:', route);
  const { bookCover, soundtrackTitle, bookTitle, author, soundtrackId } =
    route.params;

  const isFavorite = true;

  return (
    <FullScreenModal>
      <SoundtrackInfo
        bookCover={bookCover}
        soundtrackTitle={soundtrackTitle}
        bookTitle={bookTitle}
        author={author}
      />

      {author === globalState.loggedUser.given_name ? (
        <View>
          <TextButton message="Change title" onPress={() => {}} />
          <TextButton message="Change book" onPress={() => {}} />
        </View>
      ) : (
        <View />
      )}

      {isFavorite ? (
        <TextButton message="Remove from favorites" onPress={() => {}} />
      ) : (
        <TextButton message="Add to favorites" onPress={() => {}} />
      )}

      <TextButton message="Go to author" onPress={() => {}} />

      {author === globalState.loggedUser.given_name ? (
        <TextButton message="Delete" onPress={() => {}} />
      ) : (
        <View />
      )}
    </FullScreenModal>
  );
};

// const styles = StyleSheet.create({
//   fullScreenContainer: {
//     flex: 1,
//     display: 'flex'
//   },
//   fullScreenContainerWithCenteredContent: {
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });

export default SoundtrackOptionsModal;
