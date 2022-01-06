import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { ChapterItemParamList, ThemeParamList } from '../types/types';
import { SPOTIFY_API_URL } from '../constants/OrchestraConstants';
import { View } from './Themed';
import AppContext from '../../AppContext';
import ThemeItem from './ThemeItem';

const ChapterItem = ({
  chapterNumber,
  chapterTitle,
  theme,
  onPress,
  optionsOnPress
}: ChapterItemParamList) => {
  const globalState = useContext(AppContext);
  const [themeInfo, setThemeInfo] = useState<ThemeParamList>({
    title: '',
    author: '',
    themeUri: ''
  });

  useEffect(() => {
    getThemeInfo().then(result => {
      setThemeInfo(result);
    });
  }, []);

  const getThemeInfo = async (): Promise<ThemeParamList> => {
    const response = await fetch(`${SPOTIFY_API_URL}/tracks/${theme}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + globalState.accessToken
      })
    });

    const jsonResponse = await response.json();
    const artistsName = jsonResponse.artists.map((artist: any) => artist.name);

    return {
      title: jsonResponse.name,
      author: artistsName.join(', '),
      themeUri: theme
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chapterItemTitle}>
        <Text style={styles.chapterNumber}>Chapter {chapterNumber}</Text>
        {chapterTitle && <Text> - {chapterTitle}</Text>}
      </Text>

      {optionsOnPress && (
        <IconButton
          icon="dots-vertical"
          onPress={optionsOnPress}
          color="black"
          size={20}
          style={styles.optionsButton}
        />
      )}

      <ThemeItem
        title={themeInfo.title}
        author={themeInfo.author}
        themeUri={theme}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start'
  },
  optionsButton: {
    position: 'absolute',
    right: 0,
    zIndex: 10
  },
  chapterItemTitle: {
    marginLeft: 10,
    marginBottom: -10,
    marginTop: 10
  },
  chapterNumber: { fontWeight: 'bold' }
});

export default ChapterItem;
