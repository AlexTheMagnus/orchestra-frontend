import React, { useContext, useEffect } from 'react';
import { Avatar, Button, Title } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import { getUserSoundtracks } from '../components/utils';
import {
  GlobalState,
  SoundtrackItemParamList,
  StackParamList
} from '../types/types';
import { View } from '../components/Themed';
import AppContext from '../../AppContext';
import OrchestraColors from '../constants/OrchestraColors';
import SocialSection from '../components/SocialSection';
import SoundtrackCounter from '../components/SoundtrackCounter';
import SoundtrackItemList from '../components/SoundtrackItemList';

const MyProfileScreen = ({
  navigation
}: StackScreenProps<StackParamList, 'MyProfile'>) => {
  const globalState: GlobalState = useContext(AppContext);

  const [mySoundtracksList, setMySoundtracksList] = React.useState<
    SoundtrackItemParamList[]
  >([]);

  useEffect(() => {
    if (globalState.loggedUser.id) {
      getUserSoundtracks(globalState.loggedUser.id).then(mySoundtracks =>
        setMySoundtracksList(mySoundtracks)
      );
    }
  }, []);

  const cleanSessionData = () => {
    globalState.setLoggedUser({
      id: '',
      username: '',
      avatar: ''
    });
    globalState.setAccessToken(null);
    globalState.setLoggedUserFavorites(null);
  };

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Access' }]
    });
    cleanSessionData();
  };

  return (
    <View style={styles.container}>
      <Button
        uppercase={false}
        color={OrchestraColors.textColorDark}
        labelStyle={styles.logoutText}
        onPress={() => logout()}
        style={styles.logoutButton}
      >
        Log out
      </Button>
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

        <SocialSection
          profileUserId={globalState.loggedUser.id}
          showFollowButton={false}
        />
      </View>

      <SoundtrackCounter numberOfSountracks={mySoundtracksList.length} />

      {mySoundtracksList.length != 0 && (
        <View style={styles.soundtracksListContainer}>
          <SoundtrackItemList soundtracksList={mySoundtracksList} />
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
    marginTop: 30
  },
  logoutText: {
    color: OrchestraColors.textColorDark
  },
  logoutButton: { alignSelf: 'flex-end' },
  soundtracksListContainer: {
    flex: 1,
    width: '100%'
  }
});

export default MyProfileScreen;
