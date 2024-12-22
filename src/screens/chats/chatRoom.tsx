import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import MessageBox from '../../components/chats/messageBox';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore, {Filter} from '@react-native-firebase/firestore';
import ContactHeader from '../../components/router/contackHeader';
import defaultStyle from '../../styles/defaultStyles';
import Colors from '../../thema/colors';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

const ChatRoom: React.FC = ({route}) => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState('');
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState(route?.params?.chatRoomId);
  const recipiendIdPhoneNumber = route?.params?.recipiendIdPhoneNumber;
  const {selectCountry, phoneNumber} = useSelector(state => state.auth);
  const currentUserId = `${selectCountry.code}${phoneNumber}`;

  const sendMessage = async chatRoomId => {
    await firestore()
      .collection('ChatRooms')
      .doc(chatRoomId)
      .collection('messages')
      .add({
        from: currentUserId,
        message: message,
        timestamo: firestore.FieldValue.serverTimestamp(),
        read: false,
      })
      .then(() => {
        setMessage('');
      });
    await firestore().collection('ChatRooms').doc(chatRoomId).update({
      lastMessage: message,
      lastMessageTime: firestore.FieldValue.serverTimestamp(),
    });
  };

  const newChatRoom = async (recipiendId: string) => {
    const currentUserId = `${selectCountry.code}${phoneNumber}`;
    const chatRoomsRef = firestore().collection('ChatRooms');
    const exitingChatRoom = await chatRoomsRef
      .where('participans', '==', [currentUserId, recipiendId])
      .get();

    if (exitingChatRoom.size === 0) {
      const currentUserId = `${selectCountry.code}${phoneNumber}`;
      let chatRoomId;
      const newChatRoom = await chatRoomsRef.add({
        participans: [currentUserId, recipiendId],
        lastMessage: '',
        lastMessageTime: firestore.FieldValue.serverTimestamp(),
      });
      chatRoomId = newChatRoom.id;
    } else {
      chatRoomId = exitingChatRoom?.docs[0].id;
    }

    return chatRoomId;
  };

  const sendMessageToNewChat = async recipiendId => {
    if (roomId) await sendMessage(roomId);
    else {
      const chatRoomId = await newChatRoom(recipiendId);
      setRoomId(chatRoomId);
      await sendMessage(chatRoomId);
    }
  };
  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('ChatRooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamo', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot?.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        messages && setChats(messages);

        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const ListEmptyComponents = () => {
    return (
      <View
        style={{
          width: '70%',
          height: 120,
          backgroundColor: Colors.YELLOW_1,
          alignSelf: 'center',
          marginTop: 50,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Entypo name="lock" size={20} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 17,
            padding: 5,
            color: Colors.BLACK,
          }}>
          Message you send to this chat and calls are not secured wth end-to-end
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <ContactHeader recipiendIdPhoneNumber={recipiendIdPhoneNumber} />
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('/Users/apple/Desktop/Aziz/whatsapp/src/assets/icons/back.png')}
          style={{flex: 1}}>
          {loading ? (
            <ActivityIndicator size={'small'} color={Colors.GRAY_2} />
          ) : (
            <FlatList
              // inverted
              ListEmptyComponent={ListEmptyComponents}
              data={chats}
              renderItem={({item}) => <MessageBox item={item} />}
            />
          )}
        </ImageBackground>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            height: 80,
            borderTopWidth: 0.5,
            borderColor: Colors.GRAY_1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Feather name="plus" size={35} color={Colors.BLUE_1} />
          <TextInput
            value={message}
            onChangeText={value => setMessage(value)}
            style={{
              borderWidth: 0.5,
              borderRadius: 1000,
              flex: 1,
              padding: 10,
              maxHeight: 40,
              fontSize: 18,
            }}
          />
          <View style={{flexDirection: 'row', gap: 10, marginHorizontal: 15}}>
            <Pressable
              onPress={() => sendMessageToNewChat(recipiendIdPhoneNumber)}>
              <MaterialCommunityIcons
                name="send"
                size={35}
                color={Colors.BLUE_1}
              />
            </Pressable>
            <FontAwesome name="microphone" size={35} color={Colors.BLUE_1} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  images: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
