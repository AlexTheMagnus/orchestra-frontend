import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { SoundtrackItemParamList } from '../types/types';
import SoundtrackItem from './SoundtrackItem';

const SoundtrackItemList = ({
  soundtracksList
}: {
  soundtracksList: SoundtrackItemParamList[];
}) => {
  return (
    <View>
      <ScrollView>
        <View style={styles.container} />
        {soundtracksList.map((soundtrack, index) => (
          <SoundtrackItem
            key={index}
            soundtrackId={soundtrack.soundtrackId}
            bookCover={soundtrack.bookCover}
            soundtrackTitle={soundtrack.soundtrackTitle}
            bookTitle={soundtrack.bookTitle}
            author={soundtrack.author}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 80 }
});

export default SoundtrackItemList;
