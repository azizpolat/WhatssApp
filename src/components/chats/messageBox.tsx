import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '../../thema/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useSelector} from 'react-redux';

const MessageBox: React.FC<Props> = ({item}) => {
  const {selectCountry, phoneNumber} = useSelector(state => state.auth);

  return (
    <View
      style={
        item.from == `${selectCountry.code}${phoneNumber}`
          ? styles.sendMessage
          : styles.getMessage
      }>
      <View style={{}}>
        <Text style={{fontSize: 18, color: Colors.BLACK}}>{item.message}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 5,
          }}>
          {item?.from == `${selectCountry.code}${phoneNumber}` && (
            <Ionicons
              name="checkmark-done-sharp"
              size={18}
              color={Colors.BLUE_1}
            />
          )}
          <Text
            style={{
              fontSize: 18,
              color: item?.read ? Colors.BLACK : Colors.GRAY_1,
              textAlign: 'right',
            }}>
            {moment(new Date(item?.timestamo?.seconds * 1000)).format('HH:mm')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sendMessage: {
    backgroundColor: Colors.GREEN_2,
    marginRight: 5,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: 350,
    minWidth: 150,
    alignSelf: 'flex-end',
  },
  getMessage: {
    backgroundColor: Colors.WHITE,
    marginLeft: 5,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: 350,
    minWidth: 150,
    alignSelf: 'flex-start',
  },
});

export default MessageBox;
