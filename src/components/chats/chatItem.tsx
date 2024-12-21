import React, {useEffect, useState} from 'react';
import {Text, Pressable, Image, View} from 'react-native';
import {ChatItemProps} from '../../models/ui/ChatItemProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../thema/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {converFullName} from '../../utils/function';
import {useNavigation} from '@react-navigation/native';
import {MESSAGE} from '../../utils/routes';
import moment from 'moment';
import {useSelector} from 'react-redux';

const ChatItem: React.FC<ChatItemProps> = ({item}) => {
  const {selectCountry, phoneNumber} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [users, setUsers] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(
        `${selectCountry.code}${phoneNumber}` === item?.participans[0]
          ? item?.participans[1]
          : item?.participans[0],
      )
      .get()
      .then(querySnapshot => {
        setUsers(querySnapshot.data());
      });
  }, []);

  const getUnreadMessageCount = async () => {
    const messageRef = await firestore()
      .collection('ChatRooms')
      .doc(item.id)
      .collection('messages');

    const count = await messageRef.where('read', '==', false).get();
    setCount(count.size);
  };
  useEffect(() => {
    getUnreadMessageCount();
  }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(MESSAGE, {
          recipiendIdPhoneNumber: users?.phoneNumber,
          chatRoomId: item.id,
        })
      }
      style={{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: Colors.WHITE,
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {users?.profileImage ? (
          <Image
            source={{uri: users?.profileImage}}
            style={{width: 70, height: 70, borderRadius: 100}}
          />
        ) : (
          <FontAwesome6 name="circle-user" size={50} color={Colors.GRAY_1} />
        )}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderColor: Colors.GRAY_4,
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {converFullName(users?.name, users?.surname)}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="checkmark-done-sharp"
              size={25}
              color={Colors.BLUE_1}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: Colors.GRAY_4,
                fontWeight: '700',
                marginHorizontal: 5,
              }}>
              {item.lastMessage}
            </Text>
          </View>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontSize: 14, color: Colors.GRAY_4, fontWeight: '700'}}>
            {moment(new Date(item?.lastMessageTime?.seconds * 1000)).format(
              'HH:mm',
            )}
          </Text>

          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.GREEN_1,
              marginTop: 5,
            }}>
            {count != 0 && (
              <Text
                style={{
                  color: Colors.WHITE,
                  alignItems: 'center',
                  fontWeight: '700',
                }}>
                {count}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;
