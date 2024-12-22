import React, {useEffect} from 'react';
import {firebase} from '@react-native-firebase/auth';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  CONTACTS,
  COUNTRIESCODE,
  EDITPROFILE,
  MESSAGE,
  PHONENUMBER,
  TABNAVIGATOR,
  USERCALL,
  USEREGISTORONINFO,
} from '../utils/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './tabNavigation';
import PhoneNumber from '../screens/profile/phoneNumber';
import {Alert, AppState, Pressable, Text, Touchable} from 'react-native';
import Colors from '../thema/colors';
import CountriesCode from '../screens/auth/countriesCode';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import UseRegistionInfo from '../screens/auth/useRegisterionInfo';
import firestore from '@react-native-firebase/firestore';
import Contacts from '../screens/contacts';
import ChatRoom from '../screens/chats/chatRoom';
import {APPSTATE} from '../utils/contants';
import EditProfile from '../screens/profile/editProfile';
import UserCall from '../screens/calls/userCall';
import {name} from '../../node_modules/react-devtools-core/dist/parseHookNames.chunk';

const RootNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const {phoneNumber, selectCountry, name, surname} = useSelector(
    state => state.auth,
  );

  // online veya last time durumunu kontrol ediliyor
  // AppState uygulamanın anlık durumunu ögreniyoruz
  useEffect(() => {
    const subscripte = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState == APPSTATE.ACTIVE) {
          firestore()
            .collection('Users')
            .doc(`${selectCountry.code}${phoneNumber}`)
            .update({
              isOnline: true,
              lastSeen: firestore.FieldValue.serverTimestamp(),
            });
        } else {
          firestore()
            .collection('Users')
            .doc(`${selectCountry.code}${phoneNumber}`)
            .update({
              isOnline: false,
              lastSeen: firestore.FieldValue.serverTimestamp(),
            });
        }
      },
    );
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{headerTitleAlign: 'center', headerBackTitle: 'Back'}}>
      <Stack.Screen name={PHONENUMBER} component={PhoneNumber} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={TABNAVIGATOR}
        component={TabNavigation}
      />
      <Stack.Screen name={USEREGISTORONINFO} component={UseRegistionInfo} />
      <Stack.Screen name={EDITPROFILE} component={EditProfile} />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={MESSAGE}
        component={ChatRoom}
      />
      <Stack.Screen
        options={{}}
        name={COUNTRIESCODE}
        component={CountriesCode}
      />
      <Stack.Screen options={{}} name={CONTACTS} component={Contacts} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.BLACK,
          },
          headerTintColor: Colors.WHITE,
          headerRight: () => (
            <Pressable>
              <FontAwesome6 name="user-plus" color={Colors.WHITE} size={20} />
            </Pressable>
          ),
        }}
        name={USERCALL}
        component={UserCall}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
