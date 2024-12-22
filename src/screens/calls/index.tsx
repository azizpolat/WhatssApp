import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultStyles';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import CallItem from '../../components/call/callItem';

const Calls: React.FC = () => {
  const {selectCountry, phoneNumber} = useSelector(state => state.auth);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Calls')
      // .where('from', '!=', `${selectCountry.code}${phoneNumber}`)
      .onSnapshot(querySnapshot => {
        const calls = querySnapshot?.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('calls', calls);
        setCalls(calls);
      });
    return () => subscriber();
  }, []);
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={defaultStyle.container}>
        <FlatList
          data={calls}
          keyExtractor={item => item.id}
          renderItem={({item}) => <CallItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Calls;
