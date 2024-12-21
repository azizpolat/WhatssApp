import React from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import Colors from '../../thema/colors';

import {FloatActionProps} from '../../models/ui/FloatActionButton';

const FlaotActionButton: React.FC<FloatActionProps> = ({icon, onPres}) => {
  return (
    <Pressable onPress={onPres} style={styles.container}>
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75,
    backgroundColor: Colors.GREEN_1,
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlaotActionButton;
