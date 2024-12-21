import {StyleSheet} from 'react-native';
import Colors from '../thema/colors';

const defaultStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.GRAY_3,
  },
});

export default defaultStyle;