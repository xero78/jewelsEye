import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../helper/Scale';
import {styles} from './style';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import {toggleWishlistItem} from '../feacture/wishlistSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Baseurl_IP} from '../ServerIp';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
const ListView = props => {
  const {
    products,
    // handleWishlistClick,
    Allselecteddata,
    Allselecteditem,
    onRefresh,
    refreshing,
  } = props;

  const [loading, setLoading] = useState(null);
  const [serverAddress, setServerAdress] = useState('');

  const dispatch = useDispatch();
  const wishlist = useSelector(state => state?.wishlistState);
  // console.log(wishlist, 'wishlisttt');
  const focus = useIsFocused();
  const handleWishlistClick = item => {
    dispatch(toggleWishlistItem(item));
  };
  const isItemInWishlist = item => {
    return wishlist.some(wishItem => wishItem.skuName === item.skuName);
  };

  const getSever = async () => {
    const getserverip = await AsyncStorage.getItem('serverIp');
    setServerAdress(getserverip);
  };

  useEffect(() => {
    getSever();
  }, [focus]);
  console.log(serverAddress, 'serverAdresss');
  const IMAGE_BASE_URL = `https://${serverAddress}/upload/SKUImage`;
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.PrdtcontectBox}
      activeOpacity={0.7}
      key={item?.skuName}>
      <TouchableOpacity
        onPress={() => handleWishlistClick(item)}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 3,
          backgroundColor: '#fff',
          width: horizontalScale(30),
          height: verticalScale(30),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={
            isItemInWishlist(item)
              ? require('../../assets/images/fillheart.png')
              : require('../../assets/images/wishlist.png')
          }
          resizeMode="contain"
          style={[
            styles.FilterImage,
            {
              width: horizontalScale(20),
              height: verticalScale(20),
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleShareSingledata(item)}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 3,
          backgroundColor: '#fff',
          width: horizontalScale(30),
          height: verticalScale(30),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading == item.skuName ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#0000ff" />
          </View>
        ) : (
          <Image
            source={require('../../assets/images/share.png')}
            resizeMode="contain"
            style={[
              styles.FilterImage,
              {
                width: horizontalScale(20),
                height: verticalScale(20),
              },
            ]}
          />
        )}
      </TouchableOpacity>
      <FastImage
        style={{width: '100%', height: 200}}
        source={{
          uri: `${IMAGE_BASE_URL}/${item?.skuName}.jpg`,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      {/* <Image
        source={{
          uri: `${IMAGE_BASE_URL}/${item?.skuName}.jpg`,
        }}
        style={{width: '100%', height: 200}}
        resizeMode="contain"
      /> */}
      <View
        style={{
          paddingHorizontal: horizontalScale(5),
          paddingVertical: verticalScale(10),
        }}>
        <View style={styles.statuscarrotcontainer}>
          <View style={styles.statusboxcontainer}>
            <Text style={styles.contentText}>{item?.skuName}</Text>
          </View>
          <View style={styles.carrotcontainer}>
            <Text
              style={{
                color: '#000',
                fontSize: moderateScale(12),
              }}>
              {item?.metalCode}
            </Text>
          </View>
        </View>
        <View style={styles.contentNameContainer}>
          <Text
            style={[
              styles.contentText,
              {color: '#000', marginVertical: verticalScale(2)},
            ]}>
            {item?.itemName}
          </Text>
        </View>

        <View style={styles.statuscarrotcontainer}>
          {item?.tagPrice > 0 ? (
            <View>
              <Text style={[styles.contentText]}>
                {item?.currencySymbol} {item?.tagPrice}
              </Text>
            </View>
          ) : (
            ''
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleShareSingledata = async item => {
    try {
      setLoading(item.skuName); // Show loading indicator

      const imageUrl = `${IMAGE_BASE_URL}/${item.skuName}.jpg`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${item.skuName}.jpg`;

      // Download the image
      const downloadResult = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: filePath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        let message = `${item.skuName}`;
        if (item.tagPrice > 0) {
          message += `, Rs: ${item.tagPrice}`;
        }

        const shareOptions = {
          title: 'Share Product',
          message: message,
          url: 'file://' + filePath, // Share the downloaded image
          type: 'image/jpeg',
          failOnCancel: false,
        };

        await Share.open(shareOptions);
      } else {
        throw new Error('Failed to download image');
      }
    } catch (error) {
      console.error('Error sharing product:', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const dataToDisplay = Allselecteditem ? wishlist : products;

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={dataToDisplay}
        renderItem={renderItem}
        keyExtractor={item => item?.skuName}
        contentContainerStyle={{
          paddingBottom: verticalScale(20),
        }}
      />
    </View>
  );
};

export default ListView;
