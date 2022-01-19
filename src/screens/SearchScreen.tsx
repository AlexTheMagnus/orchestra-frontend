import React, { useState } from 'react';
import { Appbar, TextInput } from 'react-native-paper';
import { BACKEND_URL } from '@env';
import { StyleSheet } from 'react-native';

import { fromJsonToSoundtrackItem } from '../components/utils';
import {
  JsonSoundtrackParamList,
  SoundtrackItemParamList
} from '../types/types';
import { MAX_ELMENTENS_ON_SEARCH } from '../constants/OrchestraConstants';
import { View } from '../components/Themed';
import EmptyView from '../components/EmptyView';
import OrchestraColors from '../constants/OrchestraColors';
import SoundtrackItemList from '../components/SoundtrackItemList';
import useColorScheme from '../hooks/useColorScheme';

export default function SearchScreen() {
  const emptyMessage: string = 'Search soundtracks for your books';
  const theme = useColorScheme();

  const [resultsList, setResultsList] = useState<
    Array<SoundtrackItemParamList>
  >([]);

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
    const bookResults: string[] = [];

    json.items.forEach((result: any) => {
      const foundIsbn13 =
        result.volumeInfo.industryIdentifiers &&
        result.volumeInfo.industryIdentifiers.find(
          (industryIdentifier: { type: string; identifier: string }) =>
            industryIdentifier && industryIdentifier.type == 'ISBN_13'
        );

      foundIsbn13 && bookResults.push(foundIsbn13.identifier);
    });

    return bookResults;
  };

  const searchSoundtracksByBook = async (
    isbn: string
  ): Promise<SoundtrackItemParamList[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/soundtracks/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        book: isbn
      })
    });

    if (!response.ok) {
      const message = `An error has occured: Status error ${response.status}`;
      console.error(message);
      return;
    }

    const json = await response.json();

    return await Promise.all(
      json.soundtracks_list.map(
        async (soundtrackJson: JsonSoundtrackParamList) =>
          await fromJsonToSoundtrackItem(soundtrackJson)
      )
    );
  };

  const searchSoundtracks = async (textToSeach: string) => {
    const bookResults = await searchBooks(textToSeach);
    const soundtrackResults: SoundtrackItemParamList[] = [];
    var i = 0;

    if (bookResults) {
      while (
        soundtrackResults.length < MAX_ELMENTENS_ON_SEARCH &&
        i < bookResults.length
      ) {
        const foundSoundtracks = await searchSoundtracksByBook(bookResults[i]);

        if (foundSoundtracks) {
          soundtrackResults.push(...foundSoundtracks);
        }
        i++;
      }
    }
    setResultsList(soundtrackResults);
  };

  const inputTheme = {
    colors: {
      placeholder: OrchestraColors[theme].primaryText,
      text: OrchestraColors[theme].primaryText,
      primary: OrchestraColors.transparent
    },
    roundness: 30
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header
        style={[
          { backgroundColor: OrchestraColors[theme].headerBackground },
          styles.header
        ]}
      >
        <TextInput
          mode="outlined"
          placeholder="Search"
          selectionColor={OrchestraColors[theme].selectedText}
          outlineColor={OrchestraColors.transparent}
          onChangeText={text => {
            text ? searchSoundtracks(text) : setResultsList([]);
          }}
          style={[
            {
              backgroundColor: OrchestraColors[theme].searchInputBackgroundColor
            },
            styles.searchInput
          ]}
          theme={inputTheme}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {!resultsList.length ? (
          <View style={styles.content}>
            <EmptyView icon="search" message={emptyMessage} />
          </View>
        ) : (
          <View style={styles.soundtrackListContainer}>
            <SoundtrackItemList soundtracksList={resultsList} />
          </View>
        )}
      </View>
    </View>
  );
}

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
    justifyContent: 'center'
  },
  searchInput: {
    width: '80%',
    height: 55
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  soundtrackListContainer: {
    flex: 1,
    width: '100%'
  }
});
