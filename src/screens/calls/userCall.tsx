import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const UserCalls: React.FC<Props> = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>UserCalls</Text>
    </SafeAreaView>
  );
};

export default UserCalls;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
