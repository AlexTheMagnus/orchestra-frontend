import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { IconButton, Title, Text } from 'react-native-paper';
import DialogInput from 'react-native-dialog-input';
import { WebView } from 'react-native-webview';
import { BACKEND_URL } from '@env';

import { fromJsonToSoundtrackItem } from '../components/utils';
import {
  StackParamList,
  JsonSoundtrackParamList,
  OrchestraButtonProps,
  SoundtrackItemParamList
} from '../types/types';
import AppContext from '../../AppContext';
import EmptyView from '../components/EmptyView';
import OrchestraButton from '../components/OrchestraButton';
import SoundtrackInfo from '../components/SoundtrackInfo';
import OrchestraColors from '../constants/OrchestraColors';

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
}: StackScreenProps<StackParamList, 'Soundtrack'>) => {
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
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => {
    setIsDialogVisible(false);
  };

  useEffect(() => {
    getSoundtrackById(soundtrackId).then(soundtrack => {
      setSoundtrackInfo(soundtrack);
    });
  }, []);

  const chooseTheme = (inputText: string) => {
    const chapterTitle = inputText ?? '';
    hideDialog();
    navigation.navigate('ChooseTheme', { chapterTitle });
  };

  const ChooseChapterTitleModal = () => {
    return (
      <DialogInput
        isDialogVisible={isDialogVisible}
        title="Choose a title for your chapter"
        textInputProps={styles.modalTitle}
        submitText="Next"
        submitInput={(inputText: string) => chooseTheme(inputText)}
        closeDialog={hideDialog}
      />
    );
  };

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
      <ChooseChapterTitleModal />
      <IconButton
        icon="heart-outline"
        onPress={() => console.log(globalState.accessToken)}
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
            onPress={showDialog}
            message="ADD CHAPTER"
            propStyles={styles.addChapterButton}
          />
          <AddChapterMesage />
          {/* <WebView
            style={styles.container2}
            originWhitelist={['*']}
            source={{
              html: '<head><meta name="viewport" content="width=device-width, initial-scale=1"></meta>;<head/><iframe src="https://open.spotify.com/embed/track/0LmbmsBNz2rMyP0rpECbwD?theme=0" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
            }}
          /> */}
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
  // container2: {
  //   flex: 1,
  //   marginTop: 10,
  //   zIndex: 10
  // },
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
  },
  modalTitle: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: OrchestraColors.textColor
  }
});

export default SoundtrackScreen;
