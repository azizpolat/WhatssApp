import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CALLS,
  CHATS,
  CONTACTS,
  SETTINGS,
  STATUS,
  TABNAVIGATOR,
} from '../utils/routes';
import Status from '../screens/status';
import Calls from '../screens/calls';
import Chats from '../screens/chats';
import Settings from '../screens/settings';
import TabIcons from '../components/router/tabIcon';
import Colors from '../thema/colors';
import {Pressable, StyleSheet, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import MyContacts from '../screens/contacts';

const TabNavigation: React.FC = () => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={SETTINGS} // bir sayfaya direk yonlendırmek ıcın
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        // headerRight: true,
        tabBarStyle: {
          backgroundColor: Colors.GRAY_3,
        },
        tabBarIcon: ({focused, color, size}) => (
          <TabIcons size={size} focused={focused} color={color} route={route} />
        ),
        tabBarActiveTintColor: Colors.BLUE_1,
        tabBarInactiveTintColor: Colors.GRAY_2,
      })}>
      <Tab.Screen name={STATUS} component={Status} />

      <Tab.Screen name={CONTACTS} component={MyContacts} />
      <Tab.Screen
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable
              style={{marginHorizontal: 20}}
              onPress={() => navigation.navigate(CONTACTS)}>
              <FontAwesome5 name="edit" size={25} color={Colors.BLUE_1} />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              style={{marginHorizontal: 20}}
              onPress={() => navigation.navigate(TABNAVIGATOR)}>
              <Text
                onPress={() => navigation.goBack()}
                style={{color: Colors.BLUE_1, fontSize: 23}}>
                Edit
              </Text>
            </Pressable>
          ),
        })}
        name={CHATS}
        component={Chats}
      />

      <Tab.Screen name={CALLS} component={Calls} />
      <Tab.Screen name={SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
  },
});
