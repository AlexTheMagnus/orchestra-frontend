import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParamList, UserResponse } from '../types/types';
import { getFollowers } from '../components/utils';
import UserList from '../components/UserList';

const FollowersScreen = ({
  route
}: StackScreenProps<StackParamList, 'Followers'>) => {
  const { userId }: { userId: string } = route.params;
  const [followerList, setFollowerList] = useState<UserResponse[]>([]);

  useEffect(() => {
    getFollowers(userId).then(result => setFollowerList(result));
  }, []);

  return <UserList userList={followerList} />;
};

export default FollowersScreen;
