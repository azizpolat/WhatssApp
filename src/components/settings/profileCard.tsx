import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../thema/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {converFullName, formatPhoneNumber} from '../../utils/function';
import {EDITPROFILE, MESSAGE} from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ProfileCard: React.FC<Props> = ({item}) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const {selectCountry, phoneNumber, name, surname} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(`${selectCountry.code}${phoneNumber}`)
      .onSnapshot(documentSnapshot => {
        setUser(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate(EDITPROFILE, {user: user})}
      style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
        {user?.profileImage ? (
          <Image
            source={{uri: user?.profileImage}}
            style={{width: 100, height: 100, borderRadius: 100}}
          />
        ) : (
          <FontAwesome6 name="circle-user" size={50} color={Colors.GRAY_1} />
        )}
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.text}>
          {converFullName(user?.name, user?.surname)}
        </Text>
        <Text style={styles.status}>{user?.status}</Text>
      </View>
    </Pressable>
  );
};

export default ProfileCard;

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
    fontWeight: 'bold',
    fontSize: 23,
    color: Colors.BLACK,
    marginBottom: 5,
  },
  status: {
    fontSize: 18,
    color: Colors.GRAY_1,
  },
});
