import React, { useState, useContext } from 'react';
import uuid from 'react-native-uuid';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '@env';

import { View } from '../components/Themed';
import { StackParamList, ThemeParamList } from '../types/types';
import AppContext from '../../AppContext';
import EmptyView from '../components/EmptyView';
import ThemeItem from '../components/ThemeItem';
import OrchestraColors from '../constants/OrchestraColors';
import { SPOTIFY_API_URL } from '../constants/OrchestraConstants';

const ChooseThemeScreen = ({
  route,
  navigation
}: StackScreenProps<StackParamList, 'ChooseTheme'>) => {
  const { soundtrackId, chapterNumber, chapterTitle, chapterToUpdate } =
    route.params;
  const appNavigation = useNavigation<StackNavigationProp<any>>();
  const globalState = useContext(AppContext);
  const [resultsList, setResultsList] = useState<Array<ThemeParamList>>([]);
  const emptyMessage: string = 'Choose a theme for your chapter';

  const searchThemes = async (textToSearch: string) => {
    const response = await fetch(
      `${SPOTIFY_API_URL}/search?query=${textToSearch}&type=track&offset=0&limit=10&market=ES`,
      {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ' + globalState.accessToken
        })
      }
    );

    if (!response.ok) {
      const message = `Spotify API - Get themes request error: Status error ${response.status}`;
      console.error(message);
      return;
    }

    const jsonResponse = await response.json();
    const spotifyThemesList = jsonResponse['tracks']['items'];

    setResultsList([]);

    spotifyThemesList.forEach((result: any) => {
      const artistsName = result.artists.map((artist: any) => artist.name);
      const theme: ThemeParamList = {
        title: result.name,
        author: artistsName.join(', '),
        themeUri: result.uri.split(':').pop()
      };

      setResultsList(resultsList => resultsList.concat(theme));
    });
  };

  const createChapter = async (themeUri: string) => {
    const response = await fetch(`${BACKEND_URL}/chapters`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chapter_id: uuid.v4(),
        soundtrack_id: soundtrackId,
        chapter_number: chapterNumber,
        theme: themeUri,
        chapter_title: chapterTitle
      })
    });

    if (!response.ok) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Root' }]
      });
      const message = `An error has occured when creating your new soundtrack: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    appNavigation.push('Root', {
      screen: 'Soundtrack',
      params: { soundtrackId }
    });
  };

  const updateChapter = async (newTheme: string) => {
    const updateResponse = await fetch(
      `${BACKEND_URL}/chapters/update/${chapterToUpdate}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          theme: newTheme
        })
      }
    );

    if (!updateResponse.ok) {
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
      <ThemeItem
        title={result.title}
        author={result.author}
        themeUri={result.themeUri}
        key={index}
        onPress={
          chapterToUpdate
            ? () => updateChapter(result.themeUri)
            : () => createChapter(result.themeUri)
        }
      />
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
            text ? searchThemes(text) : setResultsList([]);
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

export default ChooseThemeScreen;
