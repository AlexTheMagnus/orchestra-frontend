import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import FavoritesIcon from './FavoritesIcon';
import MyProfileIcon from './MyProfileIcon';
import MySoundtracksIcon from './MySoundtracksIcon';
import SearchIcon from './SearchIcon';

const OrchestraIcon = ({
  icon,
  size,
  color,
  style
}: {
  icon: 'mySoundtracks' | 'favorites' | 'search' | 'profile';
  size: number;
  color: string;
  style: StyleProp<TextStyle>;
}) => {
  if (icon == 'mySoundtracks') {
    return <MySoundtracksIcon size={size} color={color} style={style} />;
  }

  if (icon == 'favorites') {
    return <FavoritesIcon size={size} color={color} style={style} />;
  }

  if (icon == 'search') {
    return <SearchIcon size={size} color={color} style={style} />;
  }

  return <MyProfileIcon size={size} color={color} style={style} />;
};

export default OrchestraIcon;
