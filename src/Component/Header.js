import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../helper/Scale';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
const Header = props => {
  const {
    generatePDF,
    setAllSelecteditem,
    fetchCatalogProductsData,
    isLoading,
    Allselecteditem,
    setSearchText,
    setCustomdropdown,
    customDropdown,
  } = props;
  const navigation = useNavigation();
  const wishlist = useSelector(state => state?.wishlistState);
  console.log(wishlist?.length, 'lengthhh');
  return (
    <View
      style={{
        height: verticalScale(55),
        backgroundColor: '#ebeef7',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => {
          fetchCatalogProductsData(),
            setAllSelecteditem(false),
            setSearchText('');
        }}
        style={{
          width: '38%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {Allselecteditem && (
          <Image
            source={require('../../assets/images/back1.png')}
            resizeMode="contain"
            style={{width: 20, height: 20}}
          />
        )}

        <Image
          source={require('../../assets/images/jewelseye.png')}
          resizeMode="contain"
          style={{width: 100, height: 50}}
        />
      </Pressable>
      <View style={{width: '28%', alignItems: 'center'}}>
        <Text
          style={{
            color: '#000',
            fontWeight: '600',
            fontSize: moderateScale(17),
          }}>
          Catalog
        </Text>
      </View>
      <View style={{width: '33%', alignItems: 'center', flexDirection: 'row'}}>
        <TouchableOpacity
          style={[styles.FilterContainer, styles.wishlistContainer]}
          onPress={() => setCustomdropdown(!customDropdown)}>
          <Image
            source={require('../../assets/images/share.png')}
            resizeMode="contain"
            style={[
              styles.FilterImage,
              {width: horizontalScale(20), height: verticalScale(30)},
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setAllSelecteditem(true)}>
          <Text style={styles.wishlistCountText}>
            {wishlist?.length && wishlist?.length}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  FilterContainer: {
    width: '65%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },

  FilterImage: {
    width: horizontalScale(30),
    height: verticalScale(20),
  },
  wishlistCountText: {
    fontSize: moderateScale(16),
    color: '#000',
    fontWeight: '600',
  },
});
