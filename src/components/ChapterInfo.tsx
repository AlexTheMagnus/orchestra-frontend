import React, { useContext, useEffect, useState } from 'react';
import { SPOTIFY_API_URL } from '../constants/OrchestraConstants';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { Title } from 'react-native-paper';
import AppContext from '../../AppContext';
import ThemeCover from './ThemeCover';
import OrchestraColors from '../constants/OrchestraColors';
import useColorScheme from '../hooks/useColorScheme';

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
  const theme = useColorScheme();
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
        <Title style={{ color: OrchestraColors[theme].primaryText }}>
          {chapterNumber ? `Chapter ${chapterNumber}` : ''}
          {chapterNumber && chapterTitle && '·'} {chapterTitle ?? ''}
        </Title>
        <Text
          style={[
            { color: OrchestraColors[theme].secondaryText },
            styles.themeTitle
          ]}
        >
          {themeInfo.title}
        </Text>
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
