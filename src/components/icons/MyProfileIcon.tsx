import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';

const MyProfileIcon = ({
  size,
  color,
  style
}: {
  size: number;
  color: string;
  style: StyleProp<TextStyle>;
}) => {
  return (
    <Ionicons name="person-outline" size={size} color={color} style={style} />
  );
};

export default MyProfileIcon;
