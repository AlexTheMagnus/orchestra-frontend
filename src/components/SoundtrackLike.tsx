import React, { useContext, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { BACKEND_URL } from '@env';

import AppContext from '../../AppContext';
import { SoundtrackLikeProps } from '../types/types';

const SoundtrackLike = ({ soundtrackId }: SoundtrackLikeProps) => {
  const globalState = useContext(AppContext);
  const [isLiked, setIsLiked] = React.useState(false);

  useEffect(() => {
    getIsLiked().then(result => {
      setIsLiked(result);
    });
  }, []);

  const getIsLiked = async () => {
    const response = await fetch(
      `${BACKEND_URL}/soundtracks/${soundtrackId}/likes`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const message = `An error has occured when loading the soundtrack: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    const jsonResponse = await response.json();
    const likes = jsonResponse.likes_list;

    return likes.includes(globalState.loggedUser.id);
  };

  const likeSoundtrack = async () => {
    const response = await fetch(`${BACKEND_URL}/soundtracks/like`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: globalState.loggedUser.id,
        soundtrack_id: soundtrackId
      })
    });

    if (!response.ok) {
      const message = `An error has occured when liking the soundtrack: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    setIsLiked(true);
  };

  const unlikeSoundtrack = async () => {
    const response = await fetch(
      `${BACKEND_URL}/soundtracks/${soundtrackId}/unlike/${globalState.loggedUser.id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const message = `An error has occured when unliking the soundtrack: Status error ${response.status}`;
      alert(message);
      console.error(message);
      return;
    }

    setIsLiked(false);
  };

  return (
    <IconButton
      icon={isLiked ? 'heart' : 'heart-outline'}
      onPress={isLiked ? () => unlikeSoundtrack() : () => likeSoundtrack()}
      color="black"
      size={30}
      style={styles.likeButton}
    />
  );
};

const styles = StyleSheet.create({
  likeButton: {
    position: 'absolute',
    left: 5,
    top: 30,
    zIndex: 10
  }
});

export default SoundtrackLike;
