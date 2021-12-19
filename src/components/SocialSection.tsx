import React, { useContext, useEffect } from 'react';
import { Button, Subheading } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AppContext from '../../AppContext';

import OrchestraColors from '../constants/OrchestraColors';
import { BACKEND_URL } from '@env';
import { UserResponse } from '../types/types';
import { View } from '../components/Themed';

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

  const followerMessage = 'Following';
  const nonFollowerMessage = 'Follow';

  useEffect(() => {
    getFollowers().then(result => {
      setFollowers(result);
      result
        .map(follower => follower.user_id)
        .includes(globalState.loggedUser.id)
        ? setIsFollower(true)
        : setIsFollower(false);
    });
  }, [isFollower]);

  useEffect(() => {
    getFollowedUsers().then(result => {
      setFollowedUsers(result);
    });
  }, []);

  const getFollowers = async (): Promise<UserResponse[]> => {
    const response = await fetch(
      `${BACKEND_URL}/users/${profileUserId}/followers`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const message = `An error has occured when loading the followers: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return [];
    }

    const jsonResponse = await response.json();
    return jsonResponse.followers;
  };

  const getFollowedUsers = async (): Promise<UserResponse[]> => {
    const response = await fetch(
      `${BACKEND_URL}/users/${profileUserId}/followed-users`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const message = `An error has occured when loading the followers: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return [];
    }

    const jsonResponse = await response.json();
    return jsonResponse.followed_users;
  };

  const followUser = async () => {
    const response = await fetch(`${BACKEND_URL}/users/follow`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        follower_id: globalState.loggedUser.id,
        followed_id: profileUserId
      })
    });

    if (!response.ok) {
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
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const message = `An error has occured when unfollowing the user: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    setIsFollower(false);
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
        <View style={styles.counterContainer}>
          <Subheading style={styles.primmaryText}>
            {followers.length}
          </Subheading>
          <Subheading style={styles.secondaryText}>Followers</Subheading>
        </View>
        <View style={styles.counterContainer}>
          <Subheading style={styles.primmaryText}>
            {followedUsers.length}
          </Subheading>
          <Subheading style={styles.secondaryText}>Following</Subheading>
        </View>
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
