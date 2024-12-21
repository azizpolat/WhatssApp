import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultStyles';
import {chats} from '../../utils/mockData';
import ChatItem from '../../components/chats/chatItem';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import FlaotActionButton from '../../components/ui/floatActionButton';
import Colors from '../../thema/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {CONTACTS} from '../../utils/routes';

const Chats: React.FC = () => {
  const navigation = useNavigation();
  const {phoneNumber, selectCountry} = useSelector(state => state.auth);

  const [chats, setChats] = useState('');

  useEffect(() => {
    const subscribe = firestore()
      .collection('ChatRooms')
      .where(
        'participans',
        'array-contains',
        `${selectCountry.code}${phoneNumber}`,
      )
      // .orderBy('lastMessageTime', 'desc')
      .onSnapshot(querySnapshot => {
        const rooms = querySnapshot?.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setChats(rooms);
      });
    return () => subscribe();
  }, []);
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={defaultStyle.container}>
        <FlatList
          ListEmptyComponent={
            <Text
              style={{textAlign: 'center', flex: 1, justifyContent: 'center'}}>
              No Message
            </Text>
          }
          data={chats}
          renderItem={({item}) => <ChatItem item={item} />}
        />

        <FlaotActionButton
          onPres={() => navigation.navigate(CONTACTS)}
          icon={<AntDesign name="plus" size={40} color={Colors.WHITE} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chats;
