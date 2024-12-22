import React, {useEffect, useState} from 'react';
import {Text, Pressable, Image, View} from 'react-native';
import {ChatItemProps} from '../../models/ui/ChatItemProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../thema/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {converFullName} from '../../utils/function';

import {MESSAGE} from '../../utils/routes';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const CallItem: React.FC<ChatItemProps> = ({item}) => {
  const navigation = useNavigation();
  const {selectCountry, phoneNumber} = useSelector(state => state.auth);
  const [users, setUsers] = useState('');

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(item.to)
      .get()
      .then(querySnapshot => {
        setUsers(querySnapshot.data());
      });
  }, []);

  const setStatus = () => {
    switch (item.status) {
      case 0:
        return 'Missed';
      case 1:
        return 'Incoming';
      case 2:
        return 'Out Coming';
      default:
        return 'Missed';
    }
  };

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
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: item.status === 0 ? Colors.RED : Colors.BLACK,
            }}>
            {converFullName(users?.name, users?.surname)}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons name="call" size={20} color={Colors.BLUE_1} />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                color: Colors.GRAY_4,
                fontWeight: '700',
                marginHorizontal: 5,
              }}>
              {setStatus()}
            </Text>
          </View>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontSize: 14, color: Colors.GRAY_4, fontWeight: '700'}}>
            {moment(new Date(item?.timestamo?.seconds * 1000)).format(
              'DD/MM/YY',
            )}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CallItem;
