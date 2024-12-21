import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Pressable, Image} from 'react-native';
import Colors from '../../thema/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {converFullName} from '../../utils/function';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

const ContactHeader: React.FC<Props> = ({recipiendIdPhoneNumber}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState();

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(recipiendIdPhoneNumber)
      .onSnapshot(querySnapshot => {
        setUser(querySnapshot.data());
      });
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={{margin: 10}}>
        <FontAwesome6 name="arrow-left" size={22} color={Colors.BLACK} />
      </Pressable>

      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{margin: 1}}>
          {user?.profileImage ? (
            <Image
              source={{uri: user?.profileImage}}
              style={{width: 70, height: 70, borderRadius: 100}}
            />
          ) : (
            <FontAwesome6 name="circle-user" size={50} color={Colors.GRAY_1} />
          )}
        </View>
        <View>
          <Text
            style={{
              fontSize: 24,
              color: Colors.BLACK,
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            {converFullName(user?.name, user?.surname)}
          </Text>
          {user?.isOnline ? (
            <Text style={{fontSize: 18, color: Colors.GREEN_1, marginLeft: 5}}>
              Online
            </Text>
          ) : (
            <Text style={{fontSize: 18, color: Colors.BLACK, marginLeft: 5}}>
              Last Seen :{' '}
              {moment(new Date(user?.lastSeen?.seconds * 1000)).format('HH:mm')}
            </Text>
          )}
        </View>
      </View>
      <View style={{margin: 10}}>
        <FontAwesome6 name="phone" size={30} color={Colors.BLUE_1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default ContactHeader;
