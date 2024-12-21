import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Input from '../../components/ui/Input';
import FlaotActionButton from '../../components/ui/floatActionButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../thema/colors';
import {useDispatch} from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const EditProfile: React.FC = ({navigation, route}) => {
  const dispatch = useDispatch();
  // profile sayfasından user bilgilerini alıyoru
  const user = route?.params?.user;

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      return image;
    } catch (error) {
      console.log('pick hatası', error);
    }
  };

  const getImageUrl = async image => {
    if (!image) return;
    const {path} = image;
    console.log('path ', path);

    const fileName = path.substring(path.lastIndexOf('/') + 1); // Dosya adı oluşturuluyor
    console.log('File Name:', fileName);
    const referance = storage().ref(`profilePictures/${user?.phoneNumber}`);
    console.log('REDEEAFE', referance);

    try {
      await referance.putFile(path);
      const url = await referance?.getDownloadURL();
      console.log('DowURl', url);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    const image = await pickImage();
    if (!image) {
      console.log('Görüntü seçilmedi.');
      return;
    }
    const imageUrl = await getImageUrl(image);
    console.log('Yüklenen Görüntü URL:', imageUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => uploadImage()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: 20,
        }}>
        {user?.profileImage ? (
          <Image
            source={{uri: user?.profileImage}}
            style={{width: 100, height: 100, borderRadius: 100}}
          />
        ) : (
          <FontAwesome6 name="circle-user" size={100} color={Colors.GRAY_1} />
        )}
        <View
          style={{
            position: 'absolute',
            bottom: -5,
            right: -5,
            backgroundColor: Colors.GREEN_1,
            borderRadius: 100,
            padding: 6,
          }}>
          <FontAwesome6 name="camera" size={15} color={Colors.WHITE} />
        </View>
      </Pressable>
      <Input
        editable={false}
        value={user?.phoneNumber}
        placeholder="Phone Number"
        onChange={(value: string) => dispatch(setPhoneNumber(value))}
      />
      <Input
        value={user?.name}
        placeholder="Name"
        onChange={(value: string) => dispatch(setName(value))}
      />
      <Input
        value={user?.surname}
        placeholder="Surname"
        onChange={(value: string) => dispatch(setSurname(value))}
      />

      <Input
        value={user?.status}
        placeholder="Status"
        onChange={(value: string) => dispatch(setSurname(value))}
      />

      <FlaotActionButton
        icon={<Ionicons name="save" size={40} color={Colors.WHITE} />}
      />
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
