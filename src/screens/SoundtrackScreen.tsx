import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { IconButton, Title, Text } from 'react-native-paper';
import { BACKEND_URL } from '@env';

import { fromJsonToSoundtrackItem } from '../components/utils';
import {
  BottomTabParamList,
  JsonSoundtrackParamList,
  OrchestraButtonProps,
  SoundtrackItemParamList
} from '../types/types';
import AppContext from '../../AppContext';
import EmptyView from '../components/EmptyView';
import OrchestraButton from '../components/OrchestraButton';
import SoundtrackInfo from '../components/SoundtrackInfo';

const AddChapterButton = ({
  onPress,
  message,
  propStyles
}: OrchestraButtonProps) => {
  return (
    <OrchestraButton
      onPress={onPress}
      message={message}
      propStyles={propStyles}
    />
  );
};

const AddChapterMesage = () => {
  return (
    <View style={styles.addChapterMessageContainer}>
      <Title>This soundtrack is currently empty</Title>
      <Text>Press the button above to add a chapter</Text>
    </View>
  );
};

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

  const globalState = useContext(AppContext);

  const [soundtrackInfo, setSoundtrackInfo] =
    React.useState<SoundtrackItemParamList>(defaultSoundtrackInfo);

  const [authorId, setAuthorId] = React.useState('');

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

    const json: JsonSoundtrackParamList = await response.json();
    setAuthorId(json.author);
    const soundtrackItem = await fromJsonToSoundtrackItem(json);

    return soundtrackItem;
  };

  return (
    <View style={styles.container}>
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
      {globalState.loggedUser.id === authorId ? (
        <View style={styles.container}>
          <AddChapterButton
            onPress={() => {}}
            message="ADD CHAPTER"
            propStyles={styles.addChapterButton}
          />
          <AddChapterMesage />
        </View>
      ) : (
        <EmptyView icon="mySoundtracks" message={emptyMessage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
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
  addChapterButton: { marginVertical: 10 },
  addChapterMessageContainer: {
    alignItems: 'center'
  }
});

export default SoundtrackScreen;
