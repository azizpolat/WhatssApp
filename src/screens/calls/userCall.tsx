import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const UserCall: React.FC<Props> = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>UserCalls</Text>
    </SafeAreaView>
  );
};

export default UserCall;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
