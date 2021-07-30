import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const SearchIcon = ({ ...props }) => {
  return <Ionicons name="search" size={100} {...props} />;
};

export default SearchIcon;
