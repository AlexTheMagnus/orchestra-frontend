import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, TextInput, Button } from 'react-native-paper';

import { View } from '../components/Themed';
import EmptyView from '../components/EmptyView';
import CreateSoundtrackButton from '../components/CreateSoundtrackButton';
import SoundtrackItemList from '../components/SoundtrackItemList';
import OrchestraColors from '../constants/OrchestraColors';

const MySoundtracksScreen = () => {
  const [visible, setVisible] = React.useState(false);
  const [newSoundtrackTitle, setNewSoundtrackTitle] = React.useState('');

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setNewSoundtrackTitle('');
  };

  const isMySoundtracksEmpty = false;
  const emptyMessage: string =
    'Touch the button above to create your first soundtrack';

  const ChooseSoundtrackTitleModal = () => {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.modal}>
          <Dialog.Title style={styles.modalTitle}>
            Choose a title for your soundtrack
          </Dialog.Title>
          <Dialog.Content style={styles.textInput}>
            <TextInput
              mode="flat"
              selectionColor={OrchestraColors.primaryColorLightest}
              underlineColor={OrchestraColors.primaryColorLightest}
              outlineColor={OrchestraColors.primaryColorLightest}
              label="NewSoundtrackTitle"
              value={newSoundtrackTitle}
              onChangeText={newSoundtrackTitle =>
                setNewSoundtrackTitle(newSoundtrackTitle)
              }
              style={styles.textInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              uppercase={false}
              color={OrchestraColors.primaryColorLightest}
              labelStyle={styles.cancelButton}
              onPress={hideDialog}
            >
              Cancel
            </Button>
            <Button
              uppercase={false}
              color={OrchestraColors.primaryColorLightest}
              labelStyle={styles.nextButton}
              onPress={hideDialog}
            >
              Next
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return (
    <View style={styles.screeenContainer}>
      <CreateSoundtrackButton onPress={showDialog} />
      <ChooseSoundtrackTitleModal />
      {isMySoundtracksEmpty ? (
        <View style={styles.content}>
          <EmptyView icon="mySoundtracks" message={emptyMessage} />
        </View>
      ) : (
        <View style={styles.mySoundtrackListContainer}>
          <SoundtrackItemList />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screeenContainer: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  mySoundtrackListContainer: {
    flex: 1,
    width: '100%'
  },
  emptyMessage: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: OrchestraColors.textColor
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: OrchestraColors.primaryColor
  },
  textInput: {
    width: '100%'
  },
  nextButton: {
    color: OrchestraColors.secondaryColor,
    fontWeight: 'bold'
  },
  cancelButton: {
    color: OrchestraColors.textColorDark
  }
});

export default MySoundtracksScreen;
