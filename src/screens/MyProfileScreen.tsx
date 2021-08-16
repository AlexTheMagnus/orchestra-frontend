import React, { useContext } from 'react';
import { Avatar, Title, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { View } from '../components/Themed';
import { StackParamList } from '../types/types';
import AppContext from '../../AppContext';
import OrchestraColors from '../constants/OrchestraColors';

const MyProfileScreen = ({
  navigation
}: StackScreenProps<StackParamList, 'MyProfile'>) => {
  const globalState = useContext(AppContext);

  const cleanSessionData = () => {
    globalState.setLoggedUser({
      id: '',
      given_name: '',
      picture: ''
    });
    globalState.setAccessToken(null);
  };

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Access' }]
    });
    cleanSessionData();
  };

  return (
    <View style={styles.container}>
      <Button
        uppercase={false}
        color={OrchestraColors.textColorDark}
        labelStyle={styles.logoutText}
        onPress={() => logout()}
        style={styles.logoutButton}
      >
        Log out
      </Button>
      <View style={styles.centeredContent}>
        <Avatar.Image
          size={150}
          source={{ uri: globalState.loggedUser.picture }}
        />
        <Title>{globalState.loggedUser.given_name}</Title>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  centeredContent: {
    alignItems: 'center',
    margin: 30
  },
  logoutText: {
    color: OrchestraColors.textColorDark
  },
  logoutButton: { alignSelf: 'flex-end' }
});

export default MyProfileScreen;
