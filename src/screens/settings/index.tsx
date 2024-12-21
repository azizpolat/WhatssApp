import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultStyles';
import ProfileCard from '../../components/settings/profileCard';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../thema/colors';

const Settings: React.FC = () => {
  const Menu = [
    {
      title: 'Account',
      icon: <FontAwesome6 name="user-tie" size={30} color={Colors.ORANGE} />,
    },

    {
      title: 'Notifications',
      icon: (
        <MaterialIcons
          name="notifications-active"
          size={30}
          color={'#3B5998'}
        />
      ),
    },
    {
      title: 'Help',
      icon: <MaterialIcons name="help" size={30} color={Colors.BLUE_1} />,
    },
  ];

  const Menu2 = [
    {
      title: 'Chats',
      icon: (
        <FontAwesome6 name="align-right" size={30} color={Colors.GREEN_1} />
      ),
    },

    {
      title: 'Store Usage',
      icon: (
        <FontAwesome6
          name="mars-stroke-right"
          size={30}
          color={Colors.YELLOW_2}
        />
      ),
    },
  ];

  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={[defaultStyle.container, {paddingHorizontal: 0}]}>
        <ScrollView>
          <ProfileCard />
          <View
            style={{
              backgroundColor: Colors.WHITE,
              marginTop: 30,
              padding: 10,
            }}>
            {Menu.map((item, key) => (
              <Pressable
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={key}>
                {item?.icon}
                <View style={{flex: 1, paddingVertical: 5}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    {item.title}
                  </Text>
                </View>
                <FontAwesome6
                  name="arrow-right"
                  size={30}
                  color={Colors.BLACK}
                />
              </Pressable>
            ))}
          </View>

          <View
            style={{
              backgroundColor: Colors.WHITE,
              marginTop: 30,
              padding: 10,
            }}>
            {Menu2.map((item, key) => (
              <Pressable
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={key}>
                {item?.icon}
                <View style={{flex: 1, paddingVertical: 5}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    {item.title}
                  </Text>
                </View>
                <FontAwesome6
                  name="arrow-right"
                  size={30}
                  color={Colors.BLACK}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
