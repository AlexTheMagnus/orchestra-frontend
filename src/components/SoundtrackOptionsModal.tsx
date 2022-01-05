import React, { useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { TouchableRipple, Dialog, Portal } from 'react-native-paper';

import { BACKEND_URL } from '@env';
import { getUserFavoritesRequest } from './utils';
import {
  GlobalState,
  SoundtrackItemParamList,
  StackParamList
} from '../types/types';
import { View } from 'react-native';
import AppContext from '../../AppContext';
import ChooseSoundtrackTitleModal from './ChooseSoundtrackTitleModal';
import FullScreenModal from './FullScreenModal';
import OrchestraColors from '../constants/OrchestraColors';
import SoundtrackInfo from './SoundtrackInfo';
import TextButton from './TextButton';

const SoundtrackOptionModal = ({
  route,
  navigation
}: StackScreenProps<StackParamList, 'SoundtrackOption'>) => {
  const {
    bookCover,
    soundtrackTitle,
    bookTitle,
    authorId,
    authorName,
    soundtrackId
  }: SoundtrackItemParamList = route.params;

  const globalState: GlobalState = useContext(AppContext);
  const [isDeleteSoundtrackDialogVisible, setIsDeleteSoundtrackDialogVisible] =
    useState(false);
  const [
    isChooseSoundtrackTitleModalVisible,
    setIsChooseSoundtrackTitleModalVisible
  ] = useState(false);

  const isFavorite = () =>
    globalState.loggedUserFavorites
      ? globalState.loggedUserFavorites.includes(soundtrackId)
      : false;

  const isAuthor = () => authorId === globalState.loggedUser.id;

  const showChooseSoundtrackTitleModal = () =>
    setIsChooseSoundtrackTitleModalVisible(true);
  const hideChooseSoundtrackTitleModal = () =>
    setIsChooseSoundtrackTitleModalVisible(false);

  const showDeleteSoundtrackDialog = () =>
    setIsDeleteSoundtrackDialogVisible(true);
  const hideDeleteSoundtrackDialog = () =>
    setIsDeleteSoundtrackDialogVisible(false);

  const updateLoggedUserFavoriteSoundtracks = async () => {
    getUserFavoritesRequest(globalState.loggedUser.id).then(userFavorites => {
      if (userFavorites) {
        globalState.setLoggedUserFavorites(
          userFavorites.favorite_soundtracks_list
        );
      }
    });
  };

  const addSoundtrackToFavorites = async () => {
    const addToFavResponse = await fetch(`${BACKEND_URL}/users/favorite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: globalState.loggedUser.id,
        soundtrack_id: soundtrackId
      })
    });

    updateLoggedUserFavoriteSoundtracks();

    if (!addToFavResponse.ok) {
      const message = `An error has occured: Status error ${addToFavResponse.status}`;
      alert(message);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  const removeSoundtrackFromFavorites = async () => {
    const removeFromFavResponse = await fetch(
      `${BACKEND_URL}/users/${globalState.loggedUser.id}/unfavorite/${soundtrackId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    updateLoggedUserFavoriteSoundtracks();

    if (!removeFromFavResponse.ok) {
      const message = `An error has occured: Status error ${removeFromFavResponse.status}`;
      alert(message);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  const deleteSoundtrack = async () => {
    const deleteResponse = await fetch(
      `${BACKEND_URL}/soundtracks/delete/${soundtrackId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    updateLoggedUserFavoriteSoundtracks();

    if (!deleteResponse.ok) {
      const message = `An error has occured: Status error ${deleteResponse.status}`;
      alert(message);
    }

    hideDeleteSoundtrackDialog();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  const updateSoundtrackTitle = async (newTitle: string) => {
    const updateResponse = await fetch(
      `${BACKEND_URL}/soundtracks/update/${soundtrackId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          soundtrack_title: newTitle
        })
      }
    );

    if (!updateResponse.ok) {
      const message = `An error has occured: Status error ${updateResponse.status}`;
      alert(message);
    }

    hideChooseSoundtrackTitleModal();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  const DeleteSoundtrackModal = () => {
    return (
      <Portal>
        <Dialog
          visible={isDeleteSoundtrackDialogVisible}
          onDismiss={hideDeleteSoundtrackDialog}
        >
          <Dialog.Title style={{ textAlign: 'center' }}>
            {'Are you sure you want to\n delete it?'}
          </Dialog.Title>
          <Dialog.Actions style={styles.dialogActions}>
            <TextButton
              style={styles.dialogCancelButton}
              message={'Cancel'}
              onPress={hideDeleteSoundtrackDialog}
            />
            <TextButton
              style={styles.dialogDeleteButton}
              message={'Delete'}
              onPress={() => deleteSoundtrack()}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return (
    <FullScreenModal>
      <ChooseSoundtrackTitleModal
        isVisible={isChooseSoundtrackTitleModalVisible}
        onSubmit={(newTitle: string) => updateSoundtrackTitle(newTitle)}
        onClose={hideChooseSoundtrackTitleModal}
      />
      <TouchableRipple onPress={() => {}}>
        <DeleteSoundtrackModal />
      </TouchableRipple>

      <SoundtrackInfo
        bookCover={bookCover}
        soundtrackTitle={soundtrackTitle}
        bookTitle={bookTitle}
        authorName={authorName}
      />

      {isAuthor() ? (
        <TextButton
          style={styles.soundtrackOption}
          message="Change title"
          onPress={showChooseSoundtrackTitleModal}
        />
      ) : (
        <View />
      )}

      {isAuthor() ? (
        <TextButton
          style={styles.soundtrackOption}
          message="Change book"
          onPress={() => {
            navigation.push('ChooseBook', {
              soundtrackTitle,
              soundtrackToUpdate: soundtrackId
            } as never);
          }}
        />
      ) : (
        <View />
      )}

      {isFavorite() ? (
        <TextButton
          style={styles.soundtrackOption}
          message="Remove from favorites"
          onPress={() => removeSoundtrackFromFavorites()}
        />
      ) : (
        <TextButton
          style={styles.soundtrackOption}
          message="Add to favorites"
          onPress={() => addSoundtrackToFavorites()}
        />
      )}

      {!isAuthor() ? (
        <TextButton
          style={styles.soundtrackOption}
          message="Go to author"
          onPress={() => {
            navigation.push('Root', {
              screen: 'UserProfile',
              params: { userId: authorId }
            } as never);
          }}
        />
      ) : (
        <View />
      )}

      {isAuthor() ? (
        <TextButton
          style={styles.soundtrackOption}
          message="Delete"
          onPress={showDeleteSoundtrackDialog}
        />
      ) : (
        <View />
      )}
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  soundtrackOption: {
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

export default SoundtrackOptionModal;
