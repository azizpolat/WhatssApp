import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Input from '../../components/ui/Input';
import {useDispatch, useSelector} from 'react-redux';
import {setName, setPhoneNumber, setSurname} from '../../store/slice/authSlice';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import FlaotActionButton from '../../components/ui/floatActionButton';
import Colors from '../../thema/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TABNAVIGATOR} from '../../utils/routes';
import {imageData} from '../../utils/mockData';

const UseRegistionInfo: React.FC<Props> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {name, surname, phoneNumber, selectCountry} = useSelector(
    state => state.auth,
  );

  const createUser = async () => {
    await firestore()
      .collection('Users')
      .doc(`${selectCountry.code}${phoneNumber}`)
      .set({
        phoneNumber: `${selectCountry.code}${phoneNumber}`,
        name: name,
        surname: surname,
        lastSeen: firestore.FieldValue.serverTimestamp(),
        createTime: firestore.FieldValue.serverTimestamp(),
        isOnline: true,
        status: 'Müsait',
        // normalde "" bos geliyor ama ben herkere gelsin diyorum
        profileImage: imageData,
      })
      .then(() => {
        navigation.navigate(TABNAVIGATOR);
        console.log('User Ekleme İşlemi Basarılı');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Input
        value={phoneNumber}
        placeholder="Phone Number"
        onChange={(value: string) => dispatch(setPhoneNumber(value))}
      />
      <Input
        value={name}
        placeholder="Name"
        onChange={(value: string) => dispatch(setName(value))}
      />
      <Input
        value={surname}
        placeholder="Surname"
        onChange={(value: string) => dispatch(setSurname(value))}
      />

      <FlaotActionButton
        onPres={() => createUser()}
        icon={
          <Ionicons name="arrow-redo-outline" size={45} color={Colors.WHITE} />
        }
      />
    </SafeAreaView>
  );
};

export default UseRegistionInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
