import React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';

const TextButton = ({
  message,
  onPress,
  style
}: {
  message: string;
  onPress: () => void;
  style: any;
}) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Text style={style}>{message}</Text>
    </TouchableRipple>
  );
};

export default TextButton;
