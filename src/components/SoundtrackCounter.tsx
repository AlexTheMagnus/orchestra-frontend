import React from 'react';
import { Title } from 'react-native-paper';

const SoundtrackCounter = ({
  numberOfSountracks
}: {
  numberOfSountracks: number;
}) => {
  const numberOfSoundtracksMessage = (): string =>
    `${numberOfSountracks} ${
      numberOfSountracks == 1 ? 'soundtrack' : 'soundtracks'
    }`;

  return <Title>{numberOfSoundtracksMessage()}</Title>;
};

export default SoundtrackCounter;
