import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { IconButton, Title, Text } from 'react-native-paper';
import DialogInput from 'react-native-dialog-input';
import { StackScreenProps } from '@react-navigation/stack';
import { BACKEND_URL } from '@env';

import { getSoundtrackById } from '../components/utils';
import {
  StackParamList,
  JsonChapterParamList,
  ChapterParamList,
  OrchestraButtonProps,
  SoundtrackItemParamList
} from '../types/types';
import AppContext from '../../AppContext';
import EmptyView from '../components/EmptyView';
import OrchestraButton from '../components/OrchestraButton';
import SoundtrackInfo from '../components/SoundtrackInfo';
import ChapterItem from '../components/ChapterItem';
import SoundtrackLike from '../components/SoundtrackLike';
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
  const [chaptersList, setChaptersList] = React.useState<ChapterParamList[]>(
    []
  );

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => {
    setIsDialogVisible(false);
  };

  useEffect(() => {
    getSoundtrackById(soundtrackId).then(async soundtrack => {
      soundtrack && setAuthorId(soundtrack.author);
      soundtrack && setSoundtrackInfo(soundtrack);
      const chapters = await getSoundtrackChapters();
      chapters &&
        setChaptersList(
          chapters.sort((a, b) => a.chapterNumber - b.chapterNumber)
        );
    });
  }, []);

  const chooseTheme = (inputText: string) => {
    const chapterTitle = inputText ?? '';
    const chapterNumber = getNextChapterNumber();
    hideDialog();
    navigation.push(
      // 'as never' is being used to avoid the 'type string is not assignable to never' error
      // This error occurs due to a ts error. There is an open issue to fix it
      'ChooseTheme' as never,
      {
        soundtrackId,
        chapterNumber,
        chapterTitle
      } as never
    );
  };

  const getNextChapterNumber = () => {
    for (var i = 0, previousChapterNumber = 1; i < chaptersList.length; i++) {
      if (
        !(chaptersList[i].chapterNumber == previousChapterNumber) &&
        !(chaptersList[i].chapterNumber == previousChapterNumber + 1)
      ) {
        return previousChapterNumber + 1;
      }
      previousChapterNumber = chaptersList[i].chapterNumber;
    }
    return previousChapterNumber + 1;
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

  const getSoundtrackChapters = async (): Promise<
    ChapterParamList[] | undefined
  > => {
    const response = await fetch(
      `${BACKEND_URL}/chapters/soundtrack/${soundtrackId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const message = `An error has occured while loading your soundtrack: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    const body = await response.json();
    return body.chapters_list.map((chapter: JsonChapterParamList) => {
      return {
        chapterId: chapter.chapter_id,
        chapterNumber: chapter.chapter_number,
        chapterTitle: chapter.chapter_title,
        soundtrackId: chapter.soundtrack_id,
        theme: chapter.theme
      };
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ChooseChapterTitleModal />
      <SoundtrackLike soundtrackId={soundtrackId} />
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
          {!chaptersList.length ? (
            <AddChapterMesage />
          ) : (
            chaptersList.map((chapter, index) => (
              <ChapterItem
                key={index}
                chapterId={chapter.chapterId}
                chapterNumber={chapter.chapterNumber}
                theme={chapter.theme}
                chapterTitle={chapter.chapterTitle}
                onPress={() => {
                  Linking.openURL(
                    `https://open.spotify.com/track/${chapter.theme}`
                  );
                }}
              />
            ))
          )}
        </View>
      ) : (
        <EmptyView icon="mySoundtracks" message={emptyMessage} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  optionsButton: {
    position: 'absolute',
    right: 5,
    top: 30,
    zIndex: 10
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
