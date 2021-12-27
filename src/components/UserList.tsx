import React from 'react';
import { Avatar, List, TouchableRipple } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { UserResponse } from '../types/types';

const UserList = ({ userList }: { userList: UserResponse[] }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const openUserProfileScreen = (userId: string) => {
    navigation.push('Root', {
      screen: 'UserProfile',
      params: { userId }
    });
  };

  const renderUserAvatar = (avatarUrl: string) => (
    <Avatar.Image
      source={
        avatarUrl
          ? { uri: avatarUrl }
          : require('../assets/images/avatar-placeholder.png')
      }
    />
  );

  return (
    <View style={styles.screeenContainer}>
      <ScrollView style={styles.favoriteSoundtrackListContainer}>
        {userList.map(({ user_id, username, user_avatar }, index) => (
          <TouchableRipple
            key={index}
            onPress={() => openUserProfileScreen(user_id)}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <List.Item
              title={username ?? ''}
              left={() => renderUserAvatar(user_avatar)}
            />
          </TouchableRipple>
        ))}
      </ScrollView>
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

export default UserList;
