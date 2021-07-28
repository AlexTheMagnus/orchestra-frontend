import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import SoundtrackItem from './SoundtrackItem';

const SoundtrackItemList = () => {
  return (
    <View>
      <ScrollView>
        <View style={styles.container} />
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
  container: { height: 80 }
});

export default SoundtrackItemList;
