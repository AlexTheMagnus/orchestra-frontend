import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParamList, UserResponse } from '../types/types';
import { getFollowedUsers } from '../components/utils';
import UserList from '../components/UserList';

const FollowingScreen = ({
  route
}: StackScreenProps<StackParamList, 'Following'>) => {
  const { userId }: { userId: string } = route.params;
  const [followedUsersList, setFollowedUsersList] = useState<UserResponse[]>(
    []
  );

  useEffect(() => {
    getFollowedUsers(userId).then(result => setFollowedUsersList(result));
  }, []);

  return <UserList userList={followedUsersList} />;
};

export default FollowingScreen;
