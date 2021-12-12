import React from 'react';
import { View, ScrollView, ImageStyle, StyleProp } from 'react-native';

import { SoundtrackItemParamList } from '../types/types';
import SoundtrackItem from './SoundtrackItem';

const SoundtrackItemList = ({
  soundtracksList,
  styles
}: {
  soundtracksList: SoundtrackItemParamList[];
  styles?: StyleProp<ImageStyle>;
}) => {
  return (
    <View>
      <ScrollView>
        <View style={styles} />
        {soundtracksList.map((soundtrack, index) => (
          <SoundtrackItem
            key={index}
            soundtrackId={soundtrack.soundtrackId}
            bookCover={soundtrack.bookCover}
            soundtrackTitle={soundtrack.soundtrackTitle}
            bookTitle={soundtrack.bookTitle}
            authorId={soundtrack.authorId}
            authorName={soundtrack.authorName}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { height: 80 }
// });

export default SoundtrackItemList;
