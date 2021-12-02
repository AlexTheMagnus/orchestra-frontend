import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { getSoundtrackById } from '../components/utils';
import { SoundtrackItemParamList, GlobalState } from '../types/types';
import { View } from '../components/Themed';
import AppContext from '../../AppContext';
import EmptyView from '../components/EmptyView';
import SoundtrackItemList from '../components/SoundtrackItemList';

const FavoritesScreen = () => {
  const emptyMessage: string =
    'Add soundtracks to favorites to find them easily';

  const globalState: GlobalState = useContext(AppContext);

  const [favoriteSoundtracksList, setFavoritesSoundtracksList] = React.useState<
    SoundtrackItemParamList[]
  >([]);

  useEffect(() => {
    if (globalState.loggedUserFavorites) {
      Promise.all(
        globalState.loggedUserFavorites.map(favoriteSountrackId =>
          getSoundtrackById(favoriteSountrackId)
        )
      ).then(
        (
          favoriteSountrackItemList: (SoundtrackItemParamList | undefined)[]
        ) => {
          const cleanFavoriteSountrackItemList: SoundtrackItemParamList[] =
            favoriteSountrackItemList.filter(
              (soundtrackItem): soundtrackItem is SoundtrackItemParamList =>
                !!soundtrackItem
            );

          setFavoritesSoundtracksList(cleanFavoriteSountrackItemList);
        }
      );
    }
  }, [globalState.loggedUserFavorites]);

  return (
    <View style={styles.screeenContainer}>
      {!favoriteSoundtracksList.length ? (
        <View style={styles.content}>
          <EmptyView icon="favorites" message={emptyMessage} />
        </View>
      ) : (
        <View style={styles.favoriteSoundtrackListContainer}>
          <SoundtrackItemList soundtracksList={favoriteSoundtracksList} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screeenContainer: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  emptyMessage: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  },
  favoriteSoundtrackListContainer: {
    flex: 1,
    width: '100%'
  }
});

export default FavoritesScreen;
