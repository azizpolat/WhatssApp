import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import CountryItem from '../../components/auth/countryItem';
import {useSelector} from 'react-redux';

const CountriesCode: React.FC<Props> = () => {
  const {countries} = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={countries}
        renderItem={({item}) => <CountryItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default CountriesCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
