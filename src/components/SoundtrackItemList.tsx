import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import SoundtrackItem from './SoundtrackItem';

const SoundtrackItemList = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
        <SoundtrackItem
          bookCover="http://books.google.com/books/content?id=8Jh_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          soundtrackTitle="El sonido de los cuervos"
          bookTitle="Crooked kingdom"
          author="AlexMagnus"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});

export default SoundtrackItemList;
