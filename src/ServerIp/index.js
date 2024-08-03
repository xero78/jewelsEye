import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useContext, useEffect, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../helper/Scale';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ServerIp = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {signIn} = useContext(AuthContext);

  const handleSubmit = async () => {
    if (searchText?.length > 0) {
      try {
        await AsyncStorage.setItem('serverIp', searchText);
        navigation.navigate('Catalog', {serverip: searchText});
        signIn(searchText && searchText);
      } catch (error) {
        console.error('Error storing server IP:', error);
      }
    } else {
      Alert.alert('Please Enter Server IP');
    }
  };

  console.log(searchText);
  return (
    <View
      style={{backgroundColor: '#272B3C', flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          width: '100%',
          height: verticalScale(200),
          backgroundColor: '#fff',
        }}>
        <Image
          source={require('../../assets/images/jewelseye.png')}
          style={{width: '100%', height: 60}}
          resizeMode="contain"
        />
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter ServerIp..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            backgroundColor: '#272B3C',
            width: '30%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 15}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServerIp;

const styles = StyleSheet.create({
  inputBox: {
    width: '85%',
  },
  inputcontainer: {
    backgroundColor: '#ebeef7',
    width: '90%',
    height: verticalScale(50),
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
    textTransform: 'lowercase',
  },
});
