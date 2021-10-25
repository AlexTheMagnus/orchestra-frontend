import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { View } from './Themed';

const FullScreenModal = ({
  children
}: {
  children: React.ReactChild | React.ReactChild[];
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <TouchableRipple
      style={styles.fullScreenContainer}
      onPress={() => navigation.goBack()}
      rippleColor="transparent"
    >
      <View style={styles.fullScreenContainerWithCenteredContent}>
        {children}
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    display: 'flex'
  },
  fullScreenContainerWithCenteredContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default FullScreenModal;
