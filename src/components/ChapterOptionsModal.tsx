import React, { useContext, useState } from 'react';
import { BACKEND_URL } from '@env';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import {
  ChapterOptionsModalParamList,
  GlobalState,
  StackParamList
} from '../types/types';
import AppContext from '../../AppContext';
import ChapterInfo from './ChapterInfo';
import ChooseChapterNumberModal from './ChooseChapterNumberModal';
import ChooseChapterTitleModal from './ChooseChapterTitleModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import FullScreenModal from './FullScreenModal';
import OrchestraColors from '../constants/OrchestraColors';
import TextButton from './TextButton';

const ChapterOptionsModal = ({
  route,
  navigation
}: StackScreenProps<StackParamList, 'ChapterOptions'>) => {
  const {
    chapterId,
    chapterNumber,
    chapterTitle,
    theme
  }: ChapterOptionsModalParamList = route.params;

  const globalState: GlobalState = useContext(AppContext);

  const [
    isChooseChapterTitleModalVisible,
    setIsChooseChapterTitleModalVisible
  ] = useState(false);
  const [
    isChooseChapterNumberModalVisible,
    setIsChooseChapterNumberModalVisible
  ] = useState(false);
  const [isDeleteChapterModalVisible, setIsDeleteChapterModalVisible] =
    useState(false);

  const showChooseChapterTitleModal = () =>
    setIsChooseChapterTitleModalVisible(true);
  const hideChooseChapterTitleModal = () =>
    setIsChooseChapterTitleModalVisible(false);

  const showChooseChapterNumberModal = () =>
    setIsChooseChapterNumberModalVisible(true);
  const hideChooseChapterNumberModal = () =>
    setIsChooseChapterNumberModalVisible(false);

  const showDeleteChapterModal = () => setIsDeleteChapterModalVisible(true);
  const hideDeleteChapterModal = () => setIsDeleteChapterModalVisible(false);

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Access' }]
    });
    globalState.cleanSessionData();
  };

  const updateChapter = async ({
    newTitle,
    newNumber
  }: {
    newTitle?: string;
    newNumber?: number;
  }) => {
    const updateResponse = await fetch(
      `${BACKEND_URL}/chapters/update/${chapterId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${globalState.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chapter_title: newTitle ?? undefined,
          chapter_number: newNumber ?? undefined
        })
      }
    );

    if (!updateResponse.ok) {
      if (updateResponse.status === 401) {
        logout();
        const message = `Session lost: Status error ${updateResponse.status}`;
        alert(message);
        return;
      }

      const message = `An error has occured: Status error ${updateResponse.status}`;
      alert(message);
    }

    hideChooseChapterTitleModal();
    hideChooseChapterNumberModal();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  const deleteChapter = async () => {
    const deleteResponse = await fetch(
      `${BACKEND_URL}/chapters/delete/${chapterId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${globalState.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!deleteResponse.ok) {
      if (deleteResponse.status === 401) {
        logout();
        const message = `Session lost: Status error ${deleteResponse.status}`;
        alert(message);
        return;
      }

      const message = `An error has occured: Status error ${deleteResponse.status}`;
      alert(message);
    }

    hideDeleteChapterModal();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  return (
    <FullScreenModal>
      <ChooseChapterTitleModal
        isVisible={isChooseChapterTitleModalVisible}
        onSubmit={(inputText: string) => updateChapter({ newTitle: inputText })}
        onClose={hideChooseChapterTitleModal}
      />

      <ChooseChapterNumberModal
        isVisible={isChooseChapterNumberModalVisible}
        onSubmit={(inputText: string) => {
          const newNumber = parseInt(inputText);
          Number.isInteger(newNumber)
            ? updateChapter({ newNumber })
            : alert('Only numeric values are valid');
        }}
        onClose={hideChooseChapterNumberModal}
      />

      <TouchableRipple onPress={() => {}}>
        <ConfirmDeleteModal
          isVisible={isDeleteChapterModalVisible}
          onDismiss={hideDeleteChapterModal}
          onConfirm={deleteChapter}
        />
      </TouchableRipple>

      <ChapterInfo
        themeUri={theme}
        chapterNumber={chapterNumber}
        chapterTitle={chapterTitle}
      />

      <TextButton
        style={styles.chapterOption}
        message="Change title"
        onPress={showChooseChapterTitleModal}
      />

      <TextButton
        style={styles.chapterOption}
        message="Change theme"
        onPress={() => {
          navigation.push('ChooseTheme', {
            chapterToUpdate: chapterId
          } as never);
        }}
      />

      <TextButton
        style={styles.chapterOption}
        message="Change number"
        onPress={showChooseChapterNumberModal}
      />

      <TextButton
        style={styles.chapterOption}
        message="Delete"
        onPress={showDeleteChapterModal}
      />
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  chapterOption: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10
  },
  dialogActions: {
    justifyContent: 'space-evenly'
  },
  dialogDeleteButton: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    color: OrchestraColors.secondaryColor
  },
  dialogCancelButton: {
    fontSize: 25,
    padding: 10
  }
});

export default ChapterOptionsModal;
