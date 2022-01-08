import React, { useContext, useEffect } from 'react';
import { BACKEND_URL } from '@env';
import { Button, Subheading, TouchableRipple } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { getFollowers, getFollowedUsers } from './utils';
import { UserResponse } from '../types/types';
import { View } from '../components/Themed';
import AppContext from '../../AppContext';
import OrchestraColors from '../constants/OrchestraColors';

const SocialSection = ({
  profileUserId,
  showFollowButton
}: {
  profileUserId: string;
  showFollowButton: boolean;
}) => {
  const globalState = useContext(AppContext);
  const [followers, setFollowers] = React.useState<UserResponse[]>([]);
  const [followedUsers, setFollowedUsers] = React.useState<UserResponse[]>([]);
  const [isFollower, setIsFollower] = React.useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const followerMessage = 'Following';
  const nonFollowerMessage = 'Follow';

  useEffect(() => {
    getFollowers(profileUserId).then(result => {
      setFollowers(result);
      result
        .map(follower => follower.user_id)
        .includes(globalState.loggedUser.id)
        ? setIsFollower(true)
        : setIsFollower(false);
    });
  }, [isFollower]);

  useEffect(() => {
    getFollowedUsers(profileUserId).then(result => {
      setFollowedUsers(result);
    });
  }, []);

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Access' }]
    });
    globalState.cleanSessionData();
  };

  const followUser = async () => {
    const response = await fetch(`${BACKEND_URL}/users/follow`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${globalState.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        follower_id: globalState.loggedUser.id,
        followed_id: profileUserId
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        const message = `Session lost: Status error ${response.status}`;
        alert(message);
        return;
      }

      const message = `An error has occured when following the user: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    setIsFollower(true);
  };

  const unfollowUser = async () => {
    const response = await fetch(
      `${BACKEND_URL}/users/${globalState.loggedUser.id}/unfollow/${profileUserId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${globalState.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        const message = `Session lost: Status error ${response.status}`;
        alert(message);
        return;
      }

      const message = `An error has occured when unfollowing the user: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    setIsFollower(false);
  };

  const openFollowersScreen = (userId: string) => {
    navigation.push('Root', {
      screen: 'Followers',
      params: { userId }
    });
  };

  const openFollowingScreen = (userId: string) => {
    navigation.push('Root', {
      screen: 'Following',
      params: { userId }
    });
  };

  return (
    <View>
      {showFollowButton && (
        <Button
          mode="outlined"
          color={OrchestraColors.primaryColor}
          style={
            isFollower
              ? [styles.button, styles.buttonActive]
              : [styles.button, styles.buttonInactive]
          }
          labelStyle={styles.buttonText}
          onPress={isFollower ? () => unfollowUser() : () => followUser()}
        >
          {isFollower ? followerMessage : nonFollowerMessage}
        </Button>
      )}

      <View style={styles.counterSection}>
        <TouchableRipple
          onPress={() => openFollowersScreen(profileUserId)}
          rippleColor="transparent"
        >
          <View style={styles.counterContainer}>
            <Subheading style={styles.primmaryText}>
              {followers.length}
            </Subheading>
            <Subheading style={styles.secondaryText}>Followers</Subheading>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => openFollowingScreen(profileUserId)}
          rippleColor="transparent"
        >
          <View style={styles.counterContainer}>
            <Subheading style={styles.primmaryText}>
              {followedUsers.length}
            </Subheading>
            <Subheading style={styles.secondaryText}>Following</Subheading>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30
  },
  buttonActive: {
    borderColor: OrchestraColors.secondaryColor
  },
  buttonInactive: {
    borderColor: OrchestraColors.primaryColor
  },
  buttonText: {
    fontWeight: 'bold'
  },
  counterSection: {
    display: 'flex',
    flexDirection: 'row'
  },
  counterContainer: {
    flexBasis: 'auto',
    alignItems: 'center',
    margin: 20
  },
  primmaryText: {
    fontWeight: 'bold'
  },
  secondaryText: {
    fontWeight: 'bold',
    color: OrchestraColors.textColorDark
  }
});

export default SocialSection;
