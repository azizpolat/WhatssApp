import React, {useEffect} from 'react';
import {Text, SafeAreaView, Alert} from 'react-native';
import defaultStyle from '../../styles/defaultStyles';
import PhoneInput from '../../components/ui/phoneInput';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setPhoneNumber} from '../../store/slice/authSlice';
import {getCountriesCode} from '../../store/actions/authActions';
import FlaotActionButton from '../../components/ui/floatActionButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../thema/colors';
import {useNavigation} from '@react-navigation/native';
import {USEREGISTORONINFO} from '../../utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PhoneNumber: React.FC = () => {
  const {phoneNumber, selectCountry} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('phone', value);
    } catch (error) {
      console.log(error);
    }
  };

  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber(
      `${selectCountry.code}${phoneNumber}`,
    );

    if (confirmation.verificationId) {
      navigation.navigate(USEREGISTORONINFO);
      storeData(`${selectCountry.code}${phoneNumber}`);
    } else {
      Alert.alert('Hatalı Telefon Numarası');
    }
  }

  const capitalizeWords = sentence => {
    return sentence
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const sentence =
    'Please confirm your country code and enter your phone number';
  const capitalizedSentence = capitalizeWords(sentence);

  useEffect(() => {
    dispatch(getCountriesCode());
  }, []);
  return (
    <SafeAreaView style={defaultStyle.container}>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          marginTop: 20,
          fontWeight: 'bold',
        }}>
        {capitalizedSentence}
      </Text>
      <PhoneInput
        value={phoneNumber}
        onChange={value => dispatch(setPhoneNumber(value))}
      />
      <FlaotActionButton
        onPres={() => signInWithPhoneNumber()}
        icon={
          <Ionicons name="arrow-redo-outline" size={45} color={Colors.WHITE} />
        }
      />
    </SafeAreaView>
  );
};

export default PhoneNumber;
