import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

import OrchestraIcon from './icons/OrchestraIcon';

const EmptyView = ({ ...props }) => {
  const { icon, message } = props;

  return (
    <View style={styles.content}>
      <OrchestraIcon icon={icon} color="black" style={styles.emptyIcon} />
      <Text style={styles.emptyMessage}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  emptyIcon: {
    margin: 20
  },
  emptyMessage: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  }
});

export default EmptyView;
