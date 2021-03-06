import React, { useEffect, useContext } from 'react';
import { BACKEND_URL } from '@env';
import { IconButton, Title, Text } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';

import {
  ChapterParamList,
  GlobalState,
  JsonChapterParamList,
  OrchestraButtonProps,
  SoundtrackItemParamList,
  StackParamList
} from '../types/types';
import { getSoundtrackById } from '../components/utils';
import AppContext from '../../AppContext';
import ChapterItem from '../components/ChapterItem';
import ChooseChapterTitleModal from '../components/ChooseChapterTitleModal';
import EmptyView from '../components/EmptyView';
import OrchestraButton from '../components/OrchestraButton';
import OrchestraColors from '../constants/OrchestraColors';
import SoundtrackInfo from '../components/SoundtrackInfo';
import SoundtrackLike from '../components/SoundtrackLike';
import useColorScheme from '../hooks/useColorScheme';

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
    authorId: '',
    authorName: '',
    soundtrackId: soundtrackId
  };

  const globalState: GlobalState = useContext(AppContext);
  const theme = useColorScheme();

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
      soundtrack && setAuthorId(soundtrack.authorId);
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
    for (var i = 0, previousChapterNumber = 0; i < chaptersList.length; i++) {
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

  const openChapterOptions = (chapter: ChapterParamList) => {
    const { chapterId, chapterNumber, chapterTitle, theme } = chapter;

    navigation.navigate(
      // 'as never' is being used to avoid the 'type string is not assignable to never' error
      // This error occurs due to a ts error. There is an open issue to fix it
      'Modal' as never,
      {
        screen: 'ChapterOptions',
        params: {
          chapterId,
          chapterNumber,
          chapterTitle,
          theme
        }
      } as never
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        { backgroundColor: OrchestraColors[theme].background },
        styles.container
      ]}
    >
      <ChooseChapterTitleModal
        isVisible={isDialogVisible}
        onSubmit={(inputText: string) => chooseTheme(inputText)}
        onClose={hideDialog}
      />
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
        color={OrchestraColors[theme].secondaryText}
        size={30}
        style={styles.optionsButton}
      />
      <SoundtrackInfo
        bookCover={soundtrackInfo.bookCover}
        soundtrackTitle={soundtrackInfo.soundtrackTitle}
        bookTitle={soundtrackInfo.bookTitle}
        authorName={soundtrackInfo.authorName}
      />

      {globalState.loggedUser.id === authorId && (
        <View style={styles.container}>
          <AddChapterButton
            onPress={showDialog}
            message="ADD CHAPTER"
            propStyles={styles.addChapterButton}
          />
        </View>
      )}

      {chaptersList.length ? (
        chaptersList.map((chapter, index) => (
          <ChapterItem
            key={index}
            chapterNumber={chapter.chapterNumber}
            theme={chapter.theme}
            chapterTitle={chapter.chapterTitle}
            onPress={() => {
              Linking.openURL(
                `https://open.spotify.com/track/${chapter.theme}`
              );
            }}
            optionsOnPress={
              globalState.loggedUser.id === authorId
                ? () => openChapterOptions(chapter)
                : undefined
            }
          />
        ))
      ) : globalState.loggedUser.username === authorId ? (
        <AddChapterMesage />
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
  }
});

export default SoundtrackScreen;
