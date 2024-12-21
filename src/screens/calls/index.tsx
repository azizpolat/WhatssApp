import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultStyles';

const Calls: React.FC = () => {
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={defaultStyle.container}>
        <Text style={{fontSize: 40}}>Calls</Text>
      </View>
    </SafeAreaView>
  );
};

export default Calls;
