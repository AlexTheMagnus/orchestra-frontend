import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { StackScreenProps } from '@react-navigation/stack';
import { BACKEND_URL } from '@env';

import { View } from '../components/Themed';
import AppContext from '../../AppContext';
import {
  StackParamList,
  SoundtrackItemParamList,
  JsonSoundtrackParamList
} from '../types/types';
import { fromJsonToSoundtrackItem } from '../components/utils';
import EmptyView from '../components/EmptyView';
import CreateSoundtrackButton from '../components/CreateSoundtrackButton';
import SoundtrackItemList from '../components/SoundtrackItemList';
import OrchestraColors from '../constants/OrchestraColors';

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
    getUserSoundtracks(globalState.loggedUser.id).then(userSoundtracks => {
      setUserSoundtracksList(userSoundtracks);
    });
  }, []);

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

  const getUserSoundtracks = async (userId: string) => {
    const response = await fetch(`${BACKEND_URL}/soundtracks/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const message = `An error has occured while loading your soundtracks: Status error ${response.status}`;
      alert(message);
      console.error(message);
    }

    const json = await response.json();
    var soundtrackItemList: SoundtrackItemParamList[] = [];

    await Promise.all(
      json.soundtracks_list.map(
        async (jsonSoundtrack: JsonSoundtrackParamList) => {
          soundtrackItemList.push(
            await fromJsonToSoundtrackItem(jsonSoundtrack)
          );
        }
      )
    );
    return soundtrackItemList;
  };

  return (
    <View style={styles.screeenContainer}>
      <CreateSoundtrackButton onPress={showDialog} />
      <ChooseSoundtrackTitleModal />
      {!userSoundtracksList.length ? (
        <View style={styles.content}>
          <EmptyView icon="mySoundtracks" message={emptyMessage} />
        </View>
      ) : (
        <View style={styles.mySoundtrackListContainer}>
          <SoundtrackItemList soundtracksList={userSoundtracksList} />
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
