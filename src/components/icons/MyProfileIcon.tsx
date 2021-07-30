import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const MyProfileIcon = ({ ...props }) => {
  return <Ionicons name="person-outline" size={100} {...props} />;
};

export default MyProfileIcon;
