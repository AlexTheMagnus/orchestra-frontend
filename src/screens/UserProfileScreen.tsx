import React, { useContext, useEffect } from 'react';
import { Avatar, Title } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import { getUserSoundtracks } from '../components/utils';
import { SoundtrackItemParamList, StackParamList } from '../types/types';
import { View } from '../components/Themed';
import AppContext from '../../AppContext';
import SoundtrackItemList from '../components/SoundtrackItemList';

const UserProfileScreen = ({
  navigation
}: StackScreenProps<StackParamList, 'UserProfile'>) => {
  const globalState = useContext(AppContext);

  const [userSoundtracksList, setUserSoundtracksList] = React.useState<
    SoundtrackItemParamList[]
  >([]);

  useEffect(() => {
    if (globalState.loggedUser.id) {
      getUserSoundtracks(globalState.loggedUser.id).then(userSoundtracks => {
        setUserSoundtracksList(userSoundtracks);
      });
    }
  }, [globalState.loggedUser.id]);

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Avatar.Image
          size={150}
          source={
            globalState.loggedUser.picture
              ? { uri: globalState.loggedUser.picture }
              : require('../assets/images/avatar-placeholder.png')
          }
        />
        <Title>{globalState.loggedUser.given_name}</Title>

        {userSoundtracksList.length && (
          <View style={styles.soundtracksListContainer}>
            <SoundtrackItemList soundtracksList={userSoundtracksList} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  centeredContent: {
    alignItems: 'center',
    margin: 30
  },
  soundtracksListContainer: {
    flex: 1,
    width: '100%'
  }
});

export default UserProfileScreen;
