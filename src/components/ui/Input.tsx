import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Colors from '../../thema/colors';
import {InputProps} from '../../models/ui/InputProps';

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  placeholder,
  editable = true,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16, color: Colors.BLACK, paddingBottom: 5}}>
        {placeholder}
      </Text>
      <TextInput
        editable={editable}
        value={value}
        onChangeText={value => onChange(value)}
        style={styles.input}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10},
  input: {
    padding: 10,
    fontSize: 18,
    backgroundColor: Colors.WHITE,
    color: Colors.BLACK,
    borderBottomWidth: 0.5,
    borderColor: Colors.GRAY_4,
  },
});

export default Input;
