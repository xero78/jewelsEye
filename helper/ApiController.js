import axios from 'axios';
import {CatalogList} from './Http';
import {Baseurl_IP} from '../src/ServerIp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
export const baseUrl = `https://nineje.jewelscore.com/Home/CatalogList`;

const focus = useIsFocused();

const ApiController = {
  getMethod: async endpoint => {
    // console.log(endpoint, 'en');
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`);
      // console.log(response, 'responseee');
      return response?.data;
    } catch (error) {
      //   console.error(error, 'get method Errorr');
      throw error;
    }
  },
};

export default ApiController;
