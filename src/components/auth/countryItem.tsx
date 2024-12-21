import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Colors from '../../thema/colors';
import {CountryItemProps} from '../../models/ui/countryItem';
import {useDispatch} from 'react-redux';
import {setCountry} from '../../store/slice/authSlice';
import {useNavigation} from '@react-navigation/native';

const CountryItem: React.FC<CountryItemProps> = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        dispatch(setCountry(item));
        navigation.goBack();
      }}
      style={styles.container}>
      <Text style={styles.text}>{item.country}</Text>
      <Text style={styles.text}>{item.code}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: Colors.GRAY_2,
    borderBottomWidth: 0.5,
  },
  text: {
    fontSize: 18,
    color: Colors.BLACK,
  },
});

export default CountryItem;
