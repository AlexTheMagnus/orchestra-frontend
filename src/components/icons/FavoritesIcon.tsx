import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const FavoritesIcon = ({ ...props }) => {
  return <Ionicons name="star-outline" size={100} {...props} />;
};

export default FavoritesIcon;
