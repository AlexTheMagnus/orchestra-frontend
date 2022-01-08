import React, { useState, useContext } from 'react';
import { Appbar, TextInput, TouchableRipple } from 'react-native-paper';
import { BACKEND_URL } from '@env';
import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import uuid from 'react-native-uuid';

import {
  BookResultParamList,
  GlobalState,
  StackParamList
} from '../types/types';
import { View } from '../components/Themed';
import AppContext from '../../AppContext';
import BookSearchItem from '../components/BookSeachItem';
import EmptyView from '../components/EmptyView';
import OrchestraColors from '../constants/OrchestraColors';

const ChooseBookScreen = ({
  route,
  navigation
}: StackScreenProps<StackParamList, 'ChooseBook'>) => {
  const { soundtrackTitle, soundtrackToUpdate } = route.params;
  const emptyMessage: string = 'Choose a book for your soundtrack';

  const globalState: GlobalState = useContext(AppContext);

  const [resultsList, setResultsList] = useState<Array<BookResultParamList>>(
    []
  );

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Access' }]
    });
    globalState.cleanSessionData();
  };

  const searchBooks = async (textToSearch: string) => {
    const response = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=' + textToSearch
    );

    if (!response.ok) {
      const message = `Google Books API request error: Status error ${response.status}`;
      console.error(message);
      return;
    }

    const json = await response.json();

    setResultsList([]);
    json.items.forEach((result: any) => {
      const isbn13IndustryIdentifier = result.volumeInfo.industryIdentifiers
        ? result.volumeInfo.industryIdentifiers.find(
            (industryIdentifier: { type: string; identifier: string }) =>
              industryIdentifier.type == 'ISBN_13'
          )
        : '';

      if (isbn13IndustryIdentifier) {
        var book: BookResultParamList = {
          isbn: isbn13IndustryIdentifier.identifier,
          title: result.volumeInfo.title,
          cover: '',
          author: ''
        };

        if (result.volumeInfo.imageLinks) {
          book.cover =
            result.volumeInfo.imageLinks.smallThumbnail ??
            result.volumeInfo.imageLinks.thumbnail;
        }

        if (result.volumeInfo.authors) {
          book.author = result.volumeInfo.authors.join(', ');
        }
        setResultsList(resultsList => resultsList.concat(book));
      }
    });
  };

  const createSoundtrack = async (isbn: string) => {
    const response = await fetch(`${BACKEND_URL}/soundtracks`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${globalState.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        soundtrack_id: uuid.v4(),
        book: isbn,
        soundtrack_title: soundtrackTitle,
        author: globalState.loggedUser.id
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        const message = `Session lost: Status error ${response.status}`;
        alert(message);
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'Root' }]
      });
      const message = `An error has occured when creating your new soundtrack: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  const updateSoundtrack = async (newBook: string) => {
    const updateResponse = await fetch(
      `${BACKEND_URL}/soundtracks/update/${soundtrackToUpdate}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${globalState.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          book: newBook
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

    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }]
    });
  };

  const listResults = () => {
    return resultsList.map((result, index) => (
      <TouchableRipple
        onPress={
          soundtrackToUpdate
            ? () => updateSoundtrack(result.isbn)
            : () => createSoundtrack(result.isbn)
        }
        rippleColor="rgba(0, 0, 0, .32)"
        key={index}
      >
        <BookSearchItem
          bookTitle={result.title}
          author={result.author}
          bookCover={result.cover}
        />
      </TouchableRipple>
    ));
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.header}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          selectionColor={OrchestraColors.textColorDark}
          outlineColor={OrchestraColors.transparent}
          onChangeText={text => {
            text ? searchBooks(text) : setResultsList([]);
          }}
          style={styles.searchInput}
          theme={inputTheme}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {!resultsList.length ? (
          <EmptyView icon="search" message={emptyMessage} />
        ) : (
          <ScrollView style={styles.bookResultsContainer}>
            {listResults()}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: OrchestraColors.primaryColorLight
  },
  searchInput: {
    width: '80%',
    height: 55,
    backgroundColor: OrchestraColors.primaryColorLightest,
    color: OrchestraColors.textColor
  },
  bookResultsContainer: {
    flex: 1,
    width: '100%'
  }
});

const inputTheme = {
  colors: {
    placeholder: 'white',
    text: 'white',
    primary: OrchestraColors.primaryColorLightest
  }
};

export default ChooseBookScreen;
