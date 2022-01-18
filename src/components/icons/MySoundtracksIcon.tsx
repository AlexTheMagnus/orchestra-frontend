import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';

const MySoundtracksIcon = ({
  size,
  color,
  style
}: {
  size: number;
  color: string;
  style: StyleProp<TextStyle>;
}) => {
  return <Fontisto name="music-note" size={size} color={color} style={style} />;
};

export default MySoundtracksIcon;
