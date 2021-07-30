import React from 'react';
import FavoritesIcon from './FavoritesIcon';
import MyProfileIcon from './MyProfileIcon';
import MySoundtracksIcon from './MySoundtracksIcon';
import SearchIcon from './SearchIcon';

const OrchestraIcon = ({ ...props }) => {
  const { icon } = props;

  if (icon == 'mySoundtracks') {
    return <MySoundtracksIcon {...props} />;
  }

  if (icon == 'favorites') {
    return <FavoritesIcon {...props} />;
  }

  if (icon == 'search') {
    return <SearchIcon {...props} />;
  }

  return <MyProfileIcon {...props} />;
};

export default OrchestraIcon;
