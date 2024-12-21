import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultStyles';

const Contacts: React.FC = () => {
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={defaultStyle.container}>
        <Text style={{fontSize: 30}}>Contacts</Text>
      </View>
    </SafeAreaView>
  );
};

export default Contacts;
