import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SPOTIFY_API_URL } from '../constants/OrchestraConstants';

import AppContext from '../../AppContext';
import { ChapterItemParamList, ThemeParamList } from '../types/types';
import { View } from './Themed';
import ThemeItem from './ThemeItem';

const ChapterItem = ({
  chapterId,
  chapterNumber,
  chapterTitle,
  theme,
  onPress
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
  chapterItemTitle: {
    marginLeft: 10,
    marginBottom: -10,
    marginTop: 10
  },
  chapterNumber: { fontWeight: 'bold' }
});

export default ChapterItem;
