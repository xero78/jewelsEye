import {Dimensions, StyleSheet} from 'react-native';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../helper/Scale';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeef7',
  },
  filterinputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: verticalScale(70),
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: verticalScale(10),
  },
  inputcontainer: {
    backgroundColor: '#ebeef7',
    width: '55%',
    height: verticalScale(40),
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: '85%',
  },
  FilterContainer: {
    width: '12%',
    backgroundColor: '#ebeef7',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
    borderRadius: moderateScale(6),
  },
  FilterImage: {
    width: horizontalScale(30),
    height: verticalScale(20),
  },
  closeImage: {
    position: 'absolute',
    right: horizontalScale(5),
  },
  FilterText: {
    color: '#fff',
    fontSize: moderateScale(18),
  },
  wishlistContainer: {
    backgroundColor: '#f2f2f2',
    width: horizontalScale(80),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(width / 2),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  // dropdown
  dropdowncontainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#8c8c8c',
    width: '67%',
    borderRadius: moderateScale(6),
  },
  dropdown: {
    height: verticalScale(40),
    borderColor: 'gray',
    borderWidth: horizontalScale(0.5),
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
  },
  selectedTextStyle: {
    fontSize: moderateScale(16),
  },
  inputSearchStyle: {
    height: verticalScale(40),
    fontSize: moderateScale(16),
  },
  wishlistCountText: {
    fontSize: moderateScale(16),
    color: '#000',
    fontWeight: '600',
  },

  // product content
  PrdtcontectBox: {
    backgroundColor: '#fff',
    width: '93%',
    height: 'auto',
    zIndex: 999,
    marginBottom: verticalScale(10),
    marginHorizontal: horizontalScale(12),
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  statusboxcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
    // backgroundColor: 'red',
  },
  statusBox: {
    width: horizontalScale(10),
    height: verticalScale(10),
    borderRadius: moderateScale(width / 2),
    backgroundColor: 'green',
    marginLeft: horizontalScale(5),
  },
  carrotcontainer: {
    width: '35%',
    alignItems: 'flex-end',
  },
  statuscarrotcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  contentText: {
    color: '#0d6efd',
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  contentNameContainer: {
    width: '90%',
  },
  customDropdowncontainer: {
    height: verticalScale(70),
    width: '100%',
    backgroundColor: '#ebeef7',
    position: 'absolute',
    zIndex: 3,
    top: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pdfsharebutton: {
    height: verticalScale(40),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(90),
    borderRadius: 6,
    width: '45%',
  },
  SparateLine: {
    height: verticalScale(40),
    borderColor: '#808080',
    borderWidth: 0.7,
  },
  container: {
    flex: 1,
  },
  backgroundStyle: {
    backgroundColor: 'white',
  },
  handleStyle: {
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%',
  },
  bottomSheetButton: {
    marginHorizontal: horizontalScale(15),
    marginVertical: verticalScale(10),
    height: verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebeef7',
    borderRadius: moderateScale(5),
  },
  bottomSheetButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },
});
