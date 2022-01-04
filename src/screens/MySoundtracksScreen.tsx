import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { StackScreenProps } from '@react-navigation/stack';

import { View } from '../components/Themed';
import AppContext from '../../AppContext';
import {
  OrchestraButtonProps,
  SoundtrackItemParamList,
  StackParamList
} from '../types/types';
import { getUserSoundtracks } from '../components/utils';
import EmptyView from '../components/EmptyView';
import OrchestraButton from '../components/OrchestraButton';
import SoundtrackItemList from '../components/SoundtrackItemList';
import OrchestraColors from '../constants/OrchestraColors';

const CreateSoundtrackButton = ({ onPress, message }: OrchestraButtonProps) => {
  return (
    <OrchestraButton
      onPress={onPress}
      message={message}
      propStyles={styles.createSoundtrackButton}
    />
  );
};

const MySoundtracksScreen = ({
  navigation
}: StackScreenProps<StackParamList, 'Access'>) => {
  const emptyMessage: string =
    'Touch the button above to create your first soundtrack';

  const globalState = useContext(AppContext);

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [userSoundtracksList, setUserSoundtracksList] = React.useState<
    SoundtrackItemParamList[]
  >([]);

  useEffect(() => {
    if (globalState.loggedUser.id) {
      getUserSoundtracks(globalState.loggedUser.id).then(userSoundtracks => {
        setUserSoundtracksList(userSoundtracks);
      });
    }
  }, [globalState.loggedUser.id]);

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => {
    setIsDialogVisible(false);
  };

  const chooseBook = (inputText: string) => {
    if (inputText) {
      hideDialog();
      // @ts-ignore: Type 'string' is not assignable to type 'never'.ts(2322)
      navigation.push('ChooseBook', { soundtrackTitle: inputText });
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
      <CreateSoundtrackButton
        onPress={showDialog}
        message="CREATE SOUNDTRACK"
      />
      <ChooseSoundtrackTitleModal />
      {!userSoundtracksList.length ? (
        <View style={styles.content}>
          <EmptyView icon="mySoundtracks" message={emptyMessage} />
        </View>
      ) : (
        <View style={styles.mySoundtracksListContainer}>
          <SoundtrackItemList
            soundtracksList={userSoundtracksList}
            styles={styles.soundtrackItemList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  createSoundtrackButton: { marginTop: 10, position: 'absolute', zIndex: 10 },
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
  mySoundtracksListContainer: {
    flex: 1,
    width: '100%'
  },
  soundtrackItemList: {
    height: 80
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
