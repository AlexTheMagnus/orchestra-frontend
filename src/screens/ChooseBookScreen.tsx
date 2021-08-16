import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar, TextInput, TouchableRipple } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { StackScreenProps } from '@react-navigation/stack';
import { BACKEND_URL } from '@env';

import { View } from '../components/Themed';
import { StackParamList, BookResultParamList } from '../types/types';
import AppContext from '../../AppContext';
import EmptyView from '../components/EmptyView';
import BookSearchItem from '../components/BookSeachItem';
import OrchestraColors from '../constants/OrchestraColors';
import { BOOK_COVER_PLACEHOLDER } from '../constants/placeholders';

const ChooseBookScreen = ({
  route,
  navigation
}: StackScreenProps<StackParamList, 'ChooseBook'>) => {
  const { soundtrackTitle } = route.params;
  const emptyMessage: string = 'Choose a book for your soundtrack';

  const globalState = useContext(AppContext);

  const [resultsList, setResultsList] = useState<Array<BookResultParamList>>(
    []
  );

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
      const isbn13IndustryIdentifier =
        result.volumeInfo.industryIdentifiers.find(
          (industryIdentifier: { type: string; identifier: string }) =>
            industryIdentifier.type == 'ISBN_13'
        );

      if (isbn13IndustryIdentifier) {
        var book: BookResultParamList = {
          isbn: isbn13IndustryIdentifier.identifier,
          title: result.volumeInfo.title,
          cover: '',
          author: ''
        };

        console.log('ISBN:', book.isbn);

        result.volumeInfo.imageLinks.smallThumbnail
          ? (book.cover = result.volumeInfo.imageLinks.smallThumbnail!)
          : result.volumeInfo.imageLinks.thumbnail
          ? (book.cover = result.volumeInfo.imageLinks.thumbnail!)
          : (book.cover = BOOK_COVER_PLACEHOLDER);

        result.volumeInfo.authors[0]
          ? (book.author = result.volumeInfo.authors[0]!)
          : (book.author = '');
        setResultsList(resultsList => resultsList.concat(book));
      }
    });
  };

  const createSoundtrack = async (isbn: string) => {
    const response = await fetch(`${BACKEND_URL}/soundtracks`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
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
      navigation.reset({
        index: 0,
        routes: [{ name: 'Root' }]
      });
      const message = `An error has occured "${isbn}": Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    navigation.push('Root');
  };

  const listResults = () => {
    return resultsList.map((result, index) => {
      return (
        <TouchableRipple
          onPress={() => createSoundtrack(result.isbn)}
          rippleColor="rgba(0, 0, 0, .32)"
          key={index}
        >
          <BookSearchItem
            bookTitle={result.title}
            author={result.author}
            bookCover={result.cover}
            key={index}
          />
        </TouchableRipple>
      );
    });
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
