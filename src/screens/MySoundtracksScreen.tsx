import React from 'react';
import { StyleSheet } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { StackScreenProps } from '@react-navigation/stack';

import { View } from '../components/Themed';
import { StackParamList } from '../types/types';
import EmptyView from '../components/EmptyView';
import CreateSoundtrackButton from '../components/CreateSoundtrackButton';
import SoundtrackItemList from '../components/SoundtrackItemList';
import OrchestraColors from '../constants/OrchestraColors';

const MySoundtracksScreen = ({
  navigation
}: StackScreenProps<StackParamList, 'Access'>) => {
  const isMySoundtracksEmpty = false;
  const emptyMessage: string =
    'Touch the button above to create your first soundtrack';

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => {
    setIsDialogVisible(false);
  };

  const chooseBook = (inputText: string) => {
    if (inputText) {
      navigation.navigate('ChooseBook', { soundtrackTitle: inputText });
    }
  };

  const ChooseSoundtrackTitleModal = () => {
    return (
      <DialogInput
        isDialogVisible={isDialogVisible}
        title="Choose a title for your soundtrack"
        textInputProps={styles.modalTitle}
        submitText="Next"
        submitInput={(inputText: string) => chooseBook(inputText)}
        closeDialog={hideDialog}
      />
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
