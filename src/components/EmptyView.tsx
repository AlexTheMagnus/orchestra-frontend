import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import OrchestraColors from '../constants/OrchestraColors';
import OrchestraIcon from './icons/OrchestraIcon';
import useColorScheme from '../hooks/useColorScheme';

const EmptyView = ({
  icon,
  message
}: {
  icon: 'mySoundtracks' | 'favorites' | 'search' | 'profile';
  message: string;
}) => {
  const theme = useColorScheme();

  return (
    <View lightColor="dark" style={styles.content}>
      <OrchestraIcon
        size={100}
        icon={icon}
        color={OrchestraColors[theme].emptyViewIcon}
        style={styles.emptyIcon}
      />
      <Text
        style={[
          { color: OrchestraColors[theme].secondaryText },
          styles.emptyMessage
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
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
