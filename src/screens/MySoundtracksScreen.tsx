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

  const getAuthorName = async (authorId: string) => {
    const response = await fetch(`${BACKEND_URL}/users/${authorId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const message = `An error has occured while getting the name of the user with ID ${authorId}: Status error ${response.status}`;
      console.error(message);
      return;
    }

    const json = await response.json();
    return json.username;
  };

  const setAuthorName = async (
    soundtracksList: JsonSoundtrackParamList,
    soundtrackItem: SoundtrackItemParamList
  ) => {
    soundtrackItem.author = await getAuthorName(soundtracksList.author);
  };

  const getBookInfo = async (isbn: string) => {
    var bookInfo: { bookCover: string; bookTitle: string } = {
      bookCover: '',
      bookTitle: ''
    };

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const message = `An error has occured while getting the info of the book with ISBN ${isbn}: Status error ${response.status}`;
      console.error(message);
      return bookInfo;
    }

    const json = await response.json();
    json.items[0].volumeInfo.imageLinks.smallThumbnail
      ? (bookInfo.bookCover =
          json.items[0].volumeInfo.imageLinks.smallThumbnail)
      : json.items[0].volumeInfo.imageLinks.thumbnail
      ? (bookInfo.bookCover = json.items[0].volumeInfo.imageLinks.thumbnail!)
      : null;
    json.items[0].volumeInfo.title
      ? (bookInfo.bookTitle = json.items[0].volumeInfo.title)
      : null;

    return bookInfo;
  };

  const setBookInfo = async (
    soundtracksList: JsonSoundtrackParamList,
    soundtrackItem: SoundtrackItemParamList
  ) => {
    const bookInfo = await getBookInfo(soundtracksList.book);
    soundtrackItem.bookCover = bookInfo.bookCover;
    soundtrackItem.bookTitle = bookInfo.bookTitle;
  };

  const fromJsonToSoundtrackItem = async (
    jsonSoundtrack: JsonSoundtrackParamList
  ) => {
    var soundtrackItem: SoundtrackItemParamList = {
      bookCover: '',
      soundtrackTitle: jsonSoundtrack.soundtrack_title,
      soundtrackId: jsonSoundtrack.soundtrack_id,
      bookTitle: '',
      author: ''
    };

    await setAuthorName(jsonSoundtrack, soundtrackItem);
    await setBookInfo(jsonSoundtrack, soundtrackItem);
    return soundtrackItem;
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
