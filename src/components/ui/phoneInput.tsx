import React from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import Colors from '../../thema/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {COUNTRIESCODE} from '../../utils/routes';
import {useSelector} from 'react-redux';
import {auth} from '@react-native-firebase/auth';

const PhoneInput: React.FC<Props> = ({onChange, value}) => {
  const {selectCountry} = useSelector(state => state.auth);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate(COUNTRIESCODE)}
        style={styles.selectCountry}>
        <Text style={styles.country}>{selectCountry?.country}</Text>
        <Feather name="chevron-right" size={25} color={Colors.GRAY_4} />
      </Pressable>
      <View style={styles.inputContainer}>
        <View style={{borderRightWidth: 0.5, paddingHorizontal: 10}}>
          <Text style={styles.countryCode}>{selectCountry?.code}</Text>
        </View>
        <TextInput
          value={value}
          onChangeText={value => onChange(value)}
          keyboardType={'number-pad'}
          style={styles.input}
          placeholder="phone number"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    padding: 10,
    fontSize: 23,
    backgroundColor: Colors.GRAY_3,
  },
  selectCountry: {
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.GRAY_2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  country: {
    fontSize: 18,
    color: Colors.BLUE_1,
  },
  countryCode: {
    fontSize: 24,
    color: Colors.BLUE_1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PhoneInput;
