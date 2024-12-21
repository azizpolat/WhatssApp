import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../thema/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {MESSAGE} from '../../utils/routes';
import {firebase} from '@react-native-firebase/firestore';
import {formatPhoneNumber} from '../../utils/function';

const ContactItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();

  const checkUserExists = async () => {
    const querySnapshot = await firebase()
      .collection('Users')
      .where('phoneNumber', '==', item?.phoneNumbers[0].number)
      .get();

    return !querySnapshot.empty;
  };

  useEffect(() => {
    // checkUserExists();
  }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(MESSAGE, {
          recipiendIdPhoneNumber: formatPhoneNumber(
            item?.phoneNumbers[0].number,
          ),
          chatRoomId: null,
        })
      }
      style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
        <FontAwesome6 name="circle-user" size={50} color={Colors.GRAY_1} />
      </View>
      <View>
        <Text style={styles.text}> {item?.displayName}</Text>
        <Text style={styles.phone}>
          {' '}
          {formatPhoneNumber(item?.phoneNumbers[0].number)}
        </Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
        <Text style={{fontSize: 18, color: Colors.GREEN_1, fontWeight: '500'}}>
          {' '}
          Davet Et
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.WHITE,
    padding: 10,
    paddingVertical: 15,
    borderBottomColor: Colors.GRAY_2,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    color: Colors.BLACK,
  },
  phone: {
    fontSize: 18,
    color: Colors.GRAY_1,
  },
});
