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
  route,
  navigation
}: StackScreenProps<StackParamList, 'UserProfile'>) => {
  const { userId }: { userId: string } = route.params;
  const globalState = useContext(AppContext);

  const [userSoundtracksList, setUserSoundtracksList] = React.useState<
    SoundtrackItemParamList[]
  >([]);

  const numberOfSoundtracksMessage = (): string =>
    `${userSoundtracksList.length} ${
      userSoundtracksList.length == 1 ? 'soundtrack' : 'soundtracks'
    }`;

  useEffect(() => {
    if (userId) {
      getUserSoundtracks(userId).then(userSoundtracks => {
        setUserSoundtracksList(userSoundtracks);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Avatar.Image
          size={150}
          source={
            globalState.loggedUser.avatar
              ? { uri: globalState.loggedUser.avatar }
              : require('../assets/images/avatar-placeholder.png')
          }
        />
        <Title>{globalState.loggedUser.username}</Title>
      </View>

      <Title>{numberOfSoundtracksMessage()}</Title>

      {userSoundtracksList.length != 0 && (
        <View style={styles.soundtracksListContainer}>
          <SoundtrackItemList soundtracksList={userSoundtracksList} />
        </View>
      )}
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
    marginTop: 60
  },
  soundtracksListContainer: {
    flex: 1,
    width: '100%'
  }
});

export default UserProfileScreen;
