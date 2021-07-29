import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { View } from '../components/Themed';
import { StackParamList, bookResult } from '../types/types';
import EmptyView from '../components/EmptyView';
import OrchestraColors from '../constants/OrchestraColors';

const ChooseBookScreen = ({
  route,
  navigation
}: StackScreenProps<StackParamList, 'ChooseBook'>) => {
  const { soundtrackTitle } = route.params;
  const emptyMessage: string = 'Choose a book for your soundtrack';

  const [resultsList, setResultsList] = useState<Array<bookResult>>([]);

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
      var book: bookResult = {
        title: result.volumeInfo.title,
        cover: '',
        author: '',
        isbn: ''
      };

      result.volumeInfo.industryIdentifiers.forEach(
        (industryIdentifier: { type: string; identifier: string }) => {
          if (industryIdentifier.type == 'ISBN_13') {
            book.isbn = industryIdentifier.identifier;
          }
        }
      );

      result.volumeInfo.imageLinks.smallThumbnail
        ? (book.cover = result.volumeInfo.imageLinks.smallThumbnail)
        : result.volumeInfo.imageLinks.thumbnail
        ? (book.cover = result.volumeInfo.imageLinks.thumbnail)
        : (book.cover = '');

      result.volumeInfo.authors[0]
        ? (book.author = result.volumeInfo.authors[0])
        : (book.author =
            'http://books.google.com/books/content?id=&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');

      setResultsList(resultsList.concat(book));
    });
  };

  const listResults = () => {
    return resultsList.map(result => {
      <Text>{result.title}</Text>;
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
          onChangeText={text => searchBooks(text)}
          style={styles.searchInput}
          theme={inputTheme}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {resultsList == [] ? (
          <EmptyView icon="search" message={emptyMessage} />
        ) : (
          <ScrollView>{listResults()}</ScrollView>
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
