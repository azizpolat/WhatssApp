import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import defaultStyle from '../../styles/defaultStyles';
import Colors from '../../thema/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {converFullName} from '../../utils/function';

const UserCall: React.FC<Props> = ({navigation, route}) => {
  const [calling, setCalling] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const user = route?.params?.user;

  //arama yapınca sayacın başlatılması durumu
  useEffect(() => {
    let intervall = null;
    if (!calling) {
      intervall = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else if (calling && seconds !== 0) {
      clearInterval(intervall);
    }
    return () => clearInterval(intervall);
  }, [calling, seconds]);

  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <StatusBar backgroundColor={Colors.BLACK} barStyle={'light-content'} />
      <View style={[defaultStyle.container, {backgroundColor: Colors.BLACK}]}>
        <View style={{flex: 1}}>
          <Text style={styles.name}>
            {converFullName(user?.name, user?.surname)}
          </Text>
          {calling ? (
            <Text style={styles.status}>Calling...</Text>
          ) : (
            <Text style={styles.status}>
              {String(minutes).padStart(2, 0)}:{String(seconds).padStart(2, 0)}
            </Text>
          )}
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {user?.profileImage ? (
              <Image
                source={{uri: user?.profileImage}}
                style={{width: 200, height: 200, borderRadius: 100}}
              />
            ) : (
              <FontAwesome6
                name="circle-user"
                size={150}
                color={Colors.GRAY_1}
              />
            )}
          </View>
        </View>
        {calling ? (
          <View
            style={{
              backgroundColor: 'rgba(28,28,28,1)',
              flexDirection: 'row',
              justifyContent: 'space-around',
              minHeight: 180,
              alignItems: 'center',
              margin: 5,
              borderRadius: 15,
              padding: 8,
            }}>
            <Pressable
              onPress={() => setCalling(false)}
              style={[styles.button, {backgroundColor: Colors.GREEN_1}]}>
              <FontAwesome6
                name="phone-volume"
                size={20}
                color={Colors.WHITE}
              />
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.button, {backgroundColor: Colors.RED}]}>
              <FontAwesome6 name="phone-slash" size={20} color={Colors.WHITE} />
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'rgba(28,28,28,1)',
              flexDirection: 'row',
              justifyContent: 'space-around',
              minHeight: 180,
              alignItems: 'center',
              margin: 5,
              borderRadius: 15,
              padding: 8,
            }}>
            <Pressable style={styles.button}>
              <FontAwesome6 name="volume-high" size={20} color={Colors.WHITE} />
            </Pressable>

            <Pressable style={styles.button}>
              <FontAwesome6 name="video" size={20} color={Colors.WHITE} />
            </Pressable>

            <Pressable style={styles.button}>
              <FontAwesome6
                name="microphone-slash"
                size={20}
                color={Colors.WHITE}
              />
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.button, {backgroundColor: Colors.RED}]}>
              <FontAwesome6 name="phone-slash" size={20} color={Colors.WHITE} />
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserCall;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: Colors.GRAY_1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: Colors.WHITE,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    color: Colors.GRAY_2,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
  },
});
