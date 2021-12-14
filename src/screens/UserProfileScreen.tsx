import React, { useEffect } from 'react';
import { Avatar, Title } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import { getUserSoundtracks } from '../components/utils';
import {
  SoundtrackItemParamList,
  StackParamList,
  UserParamList
} from '../types/types';
import { View } from '../components/Themed';
import SoundtrackItemList from '../components/SoundtrackItemList';
import { BACKEND_URL } from '@env';

const UserProfileScreen = ({
  route
}: StackScreenProps<StackParamList, 'UserProfile'>) => {
  const { userId }: { userId: string } = route.params;

  const [userInfo, setUserInfo] = React.useState<UserParamList>({
    id: '',
    username: '',
    avatar: ''
  });

  const [userSoundtracksList, setUserSoundtracksList] = React.useState<
    SoundtrackItemParamList[]
  >([]);

  useEffect(() => {
    if (userId) {
      getUserInfo().then(newUserInfo => setUserInfo(newUserInfo));
      getUserSoundtracks(userId).then(userSoundtracks =>
        setUserSoundtracksList(userSoundtracks)
      );
    }
  }, []);

  const numberOfSoundtracksMessage = (): string =>
    `${userSoundtracksList.length} ${
      userSoundtracksList.length == 1 ? 'soundtrack' : 'soundtracks'
    }`;

  const getUserInfo = async () => {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const message = `An error has occured loading the user information: Status error ${response.status}`;
      alert(message);
    }

    const jsonResponse = await response.json();

    return {
      id: jsonResponse.user_id,
      username: jsonResponse.username,
      avatar: jsonResponse.user_avatar
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Avatar.Image
          size={150}
          source={
            userInfo.avatar
              ? { uri: userInfo.avatar }
              : require('../assets/images/avatar-placeholder.png')
          }
        />
        <Title>{userInfo.username}</Title>
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
