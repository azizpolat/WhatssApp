import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const Status: React.FC<Props> = ({navigation, route}) => {
return (
<SafeAreaView style={styles.container}>
<Text>Status</Text>
</SafeAreaView>
);
};

export default Status;

const styles = StyleSheet.create({
container: {
flex: 'center',
alignItems: 'center',
justifyContent: 'center',
},
});

// import React from 'react';
// import {View, Text, SafeAreaView} from 'react-native';
// import defaultStyle from '../../styles/defaultStyles';
// import PhoneInput from '../../components/ui/phoneInput';

// const PhoneNumber1: React.FC = () => {
// return (
// <SafeAreaView style={defaultStyle.container}>
// <Text style={{fontSize: 18, textAlign: 'center', marginTop: 20}}>
// Please confirm your country code and enter your phone number{' '}
// </Text>
// <PhoneInput />
// </SafeAreaView>
// );
// };

// export default PhoneNumber1;

chats alanında resim gelmiyor

STORE İÇİN PROFİLE RESİM GELMİYOR

İLK SOHBET YUKLNEMIYOR
