// import React, {useEffect, useState} from 'react';
// import {Text, SafeAreaView} from 'react-native';
// import defaultStyle from '../../styles/defaultStyles';
// import auth from '@react-native-firebase/auth';
// import PhoneInput from '../../components/ui/phoneInput';
// import {useDispatch} from 'react-redux';
// import {getCountriesCode} from '../../store/actions/authActions';

// const PhoneNumber: React.FC = () => {
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   return (
//     <SafeAreaView style={defaultStyle.container}>
//       <Text style={{fontSize: 18, textAlign: 'center', marginTop: 20}}>
//         Please confirm your country code and enter your phone number{' '}
//       </Text>
//       <PhoneInput
//         value="05070611059"
//         onChange={value => signInWithPhoneNumber(value)}
//       />
//     </SafeAreaView>
//   );
// };

// export default PhoneNumber;
