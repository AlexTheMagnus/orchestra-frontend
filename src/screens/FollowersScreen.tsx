import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import { getFollowers } from '../components/utils';
import { StackParamList, UserResponse } from '../types/types';
import OrchestraColors from '../constants/OrchestraColors';
import UserList from '../components/UserList';

const FollowersScreen = ({
  navigation,
  route
}: StackScreenProps<StackParamList, 'Followers'>) => {
  const { userId }: { userId: string } = route.params;
  const [followerList, setFollowerList] = useState<UserResponse[]>([]);

  useEffect(() => {
    getFollowers(userId).then(result => setFollowerList(result));
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Followers" />
      </Appbar.Header>
      <UserList userList={followerList} />
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

export default FollowersScreen;
