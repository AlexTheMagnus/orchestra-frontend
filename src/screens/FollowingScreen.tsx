import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import { getFollowedUsers } from '../components/utils';
import { StackParamList, UserResponse } from '../types/types';
import OrchestraColors from '../constants/OrchestraColors';
import UserList from '../components/UserList';

const FollowingScreen = ({
  navigation,
  route
}: StackScreenProps<StackParamList, 'Following'>) => {
  const { userId }: { userId: string } = route.params;
  const [followedUsersList, setFollowedUsersList] = useState<UserResponse[]>(
    []
  );

  useEffect(() => {
    getFollowedUsers(userId).then(result => setFollowedUsersList(result));
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Following" />
      </Appbar.Header>
      <UserList userList={followedUsersList} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  header: {
    backgroundColor: OrchestraColors.primaryColorLight
  }
});

export default FollowingScreen;
