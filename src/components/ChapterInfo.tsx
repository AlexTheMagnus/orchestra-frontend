import React, { useContext, useEffect, useState } from 'react';
import { SPOTIFY_API_URL } from '../constants/OrchestraConstants';
import { Title } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import AppContext from '../../AppContext';
import ThemeCover from './ThemeCover';

type ThemeInfo = {
  cover: string;
  title: string;
};

const ChapterInfo = ({
  themeUri,
  chapterNumber,
  chapterTitle
}: {
  themeUri: string;
  chapterNumber: number;
  chapterTitle: string;
}) => {
  const globalState = useContext(AppContext);
  const [themeInfo, setThemeInfo] = useState<ThemeInfo>({
    cover: '',
    title: ''
  });

  useEffect(() => {
    getThemeInfo().then(result => {
      setThemeInfo(result);
    });
  }, [themeUri]);

  const getThemeInfo = async (): Promise<ThemeInfo> => {
    const response = await fetch(`${SPOTIFY_API_URL}/tracks/${themeUri}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + globalState.accessToken
      })
    });

    const jsonResponse = await response.json();

    return {
      cover: jsonResponse.album.images.length
        ? jsonResponse.album.images[0].url
        : '',
      title: jsonResponse.name ?? ''
    };
  };

  return (
    <View style={styles.container}>
      <ThemeCover sourceUrl={themeInfo.cover} styles={styles.themeCover} />

      <View style={styles.chapterInfo}>
        <Title>
          {chapterNumber ? `Chapter ${chapterNumber}` : ''}
          {chapterNumber && chapterTitle && '·'} {chapterTitle ?? ''}
        </Title>
        <Text style={styles.themeTitle}>{themeInfo.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  themeTitle: { textAlign: 'center' },
  chapterInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  themeCover: {
    width: '60%',
    height: undefined,
    aspectRatio: 1
  }
});

export default ChapterInfo;
