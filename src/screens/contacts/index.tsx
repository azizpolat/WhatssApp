import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  PermissionsAndroid,
  FlatList,
  StyleSheet,
} from 'react-native';
import Contacts from 'react-native-contacts';
import ContactItem from '../../components/contact/contactItem';

const MyContacts: React.FC = () => {
  const [contact, setContact] = useState();
  const getContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        console.log('Permission: ', res);
        Contacts.getAll()
          .then(contacts => {
            setContact(contacts);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  };
  useEffect(() => {
    getContacts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contact}
        renderItem={({item}) => <ContactItem item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyContacts;
