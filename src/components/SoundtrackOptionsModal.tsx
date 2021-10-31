import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableRipple, Dialog, Portal } from 'react-native-paper';
import DialogInput from 'react-native-dialog-input';
import CSS from 'csstype';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParamList } from '../types/types';
import SoundtrackInfo from './SoundtrackInfo';
import FullScreenModal from './FullScreenModal';
import AppContext from '../../AppContext';
import { View } from 'react-native';
import OrchestraColors from '../constants/OrchestraColors';
import { BACKEND_URL } from '@env';

const TextButton = ({
  message,
  onPress,
  style
}: {
  message: string;
  onPress: () => void;
  style: any;
}) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Text style={style}>{message}</Text>
    </TouchableRipple>
  );
};

const SoundtrackOptionsModal = ({
  route,
  navigation
}: StackScreenProps<StackParamList, 'SoundtrackOptions'>) => {
  const { bookCover, soundtrackTitle, bookTitle, author, soundtrackId } =
    route.params;

  const globalState = useContext(AppContext);
  const [isDeleteSoundtrackDialogVisible, setIsDeleteSoundtrackDialogVisible] =
    React.useState(false);
  const [
    isUpdateSoundtrackTitleDialogVisible,
    setIsUpdateSoundtrackTitleDialogVisible
  ] = React.useState(false);
  const [
    isUpdateSoundtrackBookDialogVisible,
    setIsUpdateSoundtrackBookDialogVisible
  ] = React.useState(false);

  const isFavorite = true;

  const showDeleteSoundtrackDialog = () =>
    setIsDeleteSoundtrackDialogVisible(true);
  const hideDeleteSoundtrackDialog = () =>
    setIsDeleteSoundtrackDialogVisible(false);

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

    if (!deleteResponse.ok) {
      const message = `An error has occured: Status error ${deleteResponse.status}`;
      alert(message);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
    hideDeleteSoundtrackDialog();
  };

  // const UpdateSoundtrackTitleModal = () => {
  //   return (
  //     <DialogInput
  //       isDialogVisible={isDeleteSoundtrackDialogVisible}
  //       title="Are you sure you want to delete it?"
  //       textInputProps={styles.modalTitle}
  //       submitText="DELETE"
  //       submitInput={(newTitle: string) =>
  //         updateSoundtrackTitle(soundtrackId, newTitle)
  //       }
  //       closeDialog={}
  //     />
  //   );
  // };

  // const UpdateSoundtrackBookModal = () => {
  //   return (
  //     <DialogInput
  //       isDialogVisible={isDeleteSoundtrackDialogVisible}
  //       title="Are you sure you want to delete it?"
  //       textInputProps={styles.modalTitle}
  //       submitText="DELETE"
  //       submitInput={(newBook: string) =>
  //         updateSoundtrackBook(soundtrackId, newBook)
  //       }
  //       closeDialog={setIsUpdateSoundtrackBookDialogVisible(false)}
  //     />
  //   );
  // };

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
      {/* <UpdateSoundtrackTitleModal />
      <UpdateSoundtrackBookModal /> */}
      <TouchableRipple onPress={() => {}}>
        <DeleteSoundtrackModal />
      </TouchableRipple>
      <SoundtrackInfo
        bookCover={bookCover}
        soundtrackTitle={soundtrackTitle}
        bookTitle={bookTitle}
        author={author}
      />

      {author === globalState.loggedUser.given_name ? (
        <View>
          <TextButton
            style={styles.soundtrackOptions}
            message="Change title"
            onPress={() => {}}
          />
          <TextButton
            style={styles.soundtrackOptions}
            message="Change book"
            onPress={() => {}}
          />
        </View>
      ) : (
        <View />
      )}

      {isFavorite ? (
        <TextButton
          style={styles.soundtrackOptions}
          message="Remove from favorites"
          onPress={() => {}}
        />
      ) : (
        <TextButton
          style={styles.soundtrackOptions}
          message="Add to favorites"
          onPress={() => {}}
        />
      )}

      <TextButton
        style={styles.soundtrackOptions}
        message="Go to author"
        onPress={() => {}}
      />

      {author === globalState.loggedUser.given_name ? (
        <TextButton
          style={styles.soundtrackOptions}
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
  modalTitle: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: OrchestraColors.textColor
  },
  soundtrackOptions: {
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

export default SoundtrackOptionsModal;
