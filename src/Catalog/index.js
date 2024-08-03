import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from 'react-native-modal';
import { styles } from './style';
import { useIsFocused } from '@react-navigation/native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../helper/Scale';
import { useSelector } from 'react-redux';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import Header from '../Component/Header';
import GridView from '../GridView';
import ListView from '../ListView';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Catalog = () => {
  const focus = useIsFocused();
  const [scrollOffset, setScrollOffset] = useState(null);
  const scrollViewRef = useRef(null);
  const [serachText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [oldData,setOldData]= useState([])
  const [loading, setLoading] = useState(false);
  const [searchloading, setSearchLoading] = useState(false);
  const [customDropdown, setCustomdropdown] = useState(false);
  const [clickwishlist, setClickWishlist] = useState({});
  const [wishlistStates, setWishlistStates] = useState([]);
  const [selectedForShare, setSelectedForShare] = useState([]);
  const [Allselecteddata, setAllSelectedData] = useState([]);
  const [Allselecteditem, setAllSelecteditem] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [listView, setListView] = useState(true);
  const [gridView, setGridView] = useState(false);
  const [showitem, setShowItem] = useState(false);
  const [showmetal, setMetal] = useState(false);
  const [showcollection, setShowCollection] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filtermetal, setFiltermetel] = useState('');
  const [filterItemsList, setFilterItemsList] = useState([]);
  const [FilterCollections, setFilterCollections] = useState([]);
  const [metalcatalogList, setMetalCatalogList] = useState([]);
  const [selectedFilterTypes, setSelectedFilterTypes] = useState([]);
  const [selectedFilterMetals, setSelectedFilterMetals] = useState([]);
  const[selectedFilterCollections,setSelectedFilterCollections]=useState([])
  
  const [serverAddress, setServerAdress] = useState('');
  const [count, setCount] = useState(1);
  
  const [isPdfDisabled, setIsPdfDisabled] = useState(false);
  const [isImageDisabled, setIsImageDisabled] = useState(false);

  const wishlist = useSelector(state => state?.wishlistState);
  const IMAGE_BASE_URL = `https://${serverAddress}/upload/SKUImage`;


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };
  const getSever = async () => {
    const getserverip = await AsyncStorage.getItem('serverIp');
    setServerAdress(getserverip);
  };

  useEffect(() => {
    getSever();
  }, [focus]);



  const fetchProductsData = async () => {
    setLoading(true);
    await axios
      .get(`https://${serverAddress && serverAddress}/Home/CatalogList`)
      .then(response => {
        // console.log(response.data?.cataloglist, "fetch products");
        setLoading(false);
        setProducts(response.data?.cataloglist);
        setOldData(response.data?.cataloglist)
      })
      .catch(error => {
        setLoading(false);
        console.log('productt: ', error);
      });
  };

  useEffect(() => {
    if (serverAddress) {
      fetchProductsData()
    }
  }, [focus, serverAddress])


const onSearch=async(text)=>{
if(text==''){
setProducts(oldData)
}else{
  let TempSearchList=products?.filter((item)=>{
    return(
      item.skuName.toLowerCase().indexOf(text.toLowerCase())>-1
    )
  }) 
  setProducts(TempSearchList)
}
}



  const generatePDF = async () => {
    setIsLoading(true);

    if (wishlist?.length > 0) {
      const downloadDirectoryPath = `${RNFS.DownloadDirectoryPath}`;

      const wishlistRows = wishlist
        .map((item, index) => {
          const priceDisplay =
            parseFloat(item.tagPrice) > 0
              ? `<strong> ${item.currencySymbol} ${item.tagPrice}</strong>`
              : '';
          return `
                <tr>
                  <td>${index + 1}</td>
                  <td>
                    <img src="${IMAGE_BASE_URL}/${
            item.skuName
          }.jpg" alt="Product Image" style="max-width:300px; max-height:300px;" />
                  </td>
                  <td>
                    ${item.skuName} ${item.metalCode}<br>
                     ${item.itemName}<br>
                  <br>
                   ${priceDisplay}<br>

                  </td>
                </tr>
              `;
        })
        .join('');

      const totalPrice = wishlist.reduce(
        (sum, item) => sum + parseFloat(item.tagPrice),
        0,
      );

      const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        background-color: #146C93;
        color: white;
        text-align: left;
          font-size: 35px;
      }
      td {
        text-align: left;
         font-size: 30px;
      }
    </style>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Product Images</th>
          <th>Product Details</th>
        </tr>
      </thead>
      <tbody>
        ${wishlistRows}
      </tbody>

    </table>
  </body>
  </html>`;

      try {
        const options = {
          html,
          fileName: `JewelsEye${count}`,
          directory: 'Downloads',
        };
        const file = await RNHTMLtoPDF.convert(options);
        console.log('PDF File:', file.filePath);

        const shareOptions = {
          title: 'Share PDF',
          url: `file://${file.filePath}`,
          failOnCancel: false,
        };
        await Share.open(shareOptions);
        setCount(count + 1);
        setIsLoading(false);
        setCustomdropdown(false);
        setIsImageDisabled(false);
      } catch (error) {
        Alert.alert('Error', error.message);
        setIsLoading(false);
        setCustomdropdown(false);
        setIsImageDisabled(false);
      }
    } else {
      Alert.alert('Please select an item');
      setIsLoading(false);
      setIsImageDisabled(false);
    }
  };
  const onSharePress = async () => {
    setIsSharing(true);
    setIsPdfDisabled(true);
    if (wishlist.length === 0) {
      Alert.alert('No items to share');
      return;
    }
    try {
      const downloadPromises = wishlist.map(item => {
        const imageUrl = `${IMAGE_BASE_URL}/${item.skuName}.jpg`
        const imagePath = `${RNFS.CachesDirectoryPath}/${item.skuName}.jpg`
        return RNFS.downloadFile({
          fromUrl: imageUrl,
          toFile: imagePath,
        }).promise.then(() => {
          return RNFS.readFile(imagePath, 'base64').then(base64Data => {
             return `data:image/jpeg;base64,${base64Data}`
          });
        });
      });
      const downloadedItems = await Promise.all(downloadPromises);
      // console.log(downloadedItems,"downloaditemsss")
      // const base64Images = downloadedItems.map(item => item.base64Image);
      const captions = wishlist?.map(item => item.skuName).join('\n\n');
      const shareOptions = {
        title: 'Share Wishlist Images',
        urls: downloadedItems,
        failOnCancel: false,
        message:captions,
        social: Share.Social.WHATSAPP,
        
      };
      console.log(shareOptions.length,'--->')
      await Share.shareSingle(shareOptions);
      setCustomdropdown(false);
      setIsSharing(false);
      setIsPdfDisabled(false);
    } catch (error) {
      console.error('Error sharing images: ', error);
      Alert.alert('Image Not Found')
      setIsSharing(false);
      setIsPdfDisabled(false);
      setCustomdropdown(false)
    }
  };



  
  
  
  

  // console.log(products,"producttt")

  const filterItemsName=()=>{
    const uniqueItems = products.filter((obj, index) => {
      return index === products.findIndex(o => obj.itemName === o.itemName);
  });
  setFilterItemsList(uniqueItems)
  }

  const filterMetalName=()=>{
    const uniqueItems = products.filter((obj, index) => {
      return index === products.findIndex(o => obj.metalCode === o.metalCode);
  });
  setMetalCatalogList(uniqueItems)
  
  }

  const filterCollectionName=()=>{
    const uniqueItems = products.filter((obj, index) => {
      return index === products.findIndex(o => obj.styleName === o.styleName);
  });
  setFilterCollections(uniqueItems)
  }



  const handleFilterButtonClick = (value, type) => {
    let updatedFilters;
    if (type === 'item') {
      updatedFilters = selectedFilterTypes.includes(value)
        ? selectedFilterTypes.filter(item => item !== value)
        : [...selectedFilterTypes, value];
      setSelectedFilterTypes(updatedFilters);
    } else if (type === 'metal') {
      updatedFilters = selectedFilterMetals.includes(value)
        ? selectedFilterMetals.filter(metal => metal !== value)
        : [...selectedFilterMetals, value];
      setSelectedFilterMetals(updatedFilters);
    } else if (type === 'collection') {
      updatedFilters = selectedFilterCollections.includes(value)
        ? selectedFilterCollections.filter(collection => collection !== value)
        : [...selectedFilterCollections, value];
      setSelectedFilterCollections(updatedFilters);
    }
  };


  const applyFilters = () => {
    let filteredProducts = [...products];
    if (selectedFilterTypes.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        selectedFilterTypes.includes(product.itemName)
      );
    }
    if (selectedFilterMetals.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        selectedFilterMetals.includes(product.metalCode)
      );
    }
    if (selectedFilterCollections.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        selectedFilterCollections.includes(product.styleName)
      );
    }
    setProducts(filteredProducts);
  };
  
  
  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <Header
            customDropdown={customDropdown}
            setCustomdropdown={setCustomdropdown}
            filterType={filterType}
            setFilterType={setFilterType}
            setMetal={setMetal}
            filtermetal={filtermetal}
            setFiltermetel={setFiltermetel}
            wishlist={wishlist}
            // generatePDF={generatePDF}
            setAllSelecteditem={setAllSelecteditem}
            // fetchCatalogProductsData={fetchProductsData}
            fetchProductsData={fetchProductsData}
            isLoading={isLoading}
            Allselecteditem={Allselecteditem}
            setSearchText={setSearchText}
          />

          {customDropdown ? (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ebeef7',
              }}>
              <TouchableOpacity
                disabled={isPdfDisabled}
                onPress={() => {
                  setIsImageDisabled(true);
                  generatePDF();
                }}
                style={{
                  width: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#ebeef7',
                }}>
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <Image
                      source={require('../../assets/images/pdf.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#000',
                        fontSize: 15,
                        marginLeft: 5,
                      }}>
                      PDF
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <View style={{ height: 40, color: '#000', borderWidth: 0.7 }} />
              <TouchableOpacity
                disabled={isImageDisabled}
                onPress={() => {
                  setIsPdfDisabled(true);
                  onSharePress();
                }}
                style={{
                  width: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                {isSharing ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <Image
                      source={require('../../assets/images/image.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#000',
                        fontSize: 15,
                        marginLeft: 5,
                      }}>
                      IMAGE
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.filterinputContainer}>
            <TouchableOpacity
              onPress={() => {
                setListView(true);
                setGridView(false);
              }}
              style={styles.FilterContainer}>
              <Image
                source={require('../../assets/images/listblack1.png')}
                resizeMode="contain"
                style={[styles.FilterImage, { width: horizontalScale(50) }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setListView(false);
                setGridView(true);
              }}
              style={styles.FilterContainer}>
              <Image
                source={require('../../assets/images/gridblack.png')}
                resizeMode="contain"
                style={styles.FilterImage}
              />
            </TouchableOpacity>
            <View style={styles.inputcontainer}>
              <TextInput
                style={styles.inputBox}
                placeholder="Search SKU"
                value={serachText}
                onChangeText={text => {
                  setSearchText(text);
                  onSearch(text)
                }}
              />
            </View>
            <TouchableOpacity
              onPress={toggleModal}
              style={styles.FilterContainer}>
              <Image
                source={require('../../assets/images/filterblack.png')}
                resizeMode="contain"
                style={styles.FilterImage}
              />
            </TouchableOpacity>
          </View>
          {/* modallllll */}
          <Modal
            swipeDirection={'right'}
            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            isVisible={isModalVisible}
            scrollTo={handleScrollTo}
            scrollOffset={scrollOffset}
            scrollOffsetMax={400 - 300} 
            propagateSwipe={true}
            backdropOpacity={0}
            style={{
              margin: 0,
              marginTop:
                Platform.OS === 'android'
                  ? verticalScale(55)
                  : verticalScale(105),
            }}>
           
            <View
              style={{
                flex: 1,
                backgroundColor: '#ebeef7',
                width: '90%',
                position: 'absolute',
                right: 0,
                height: '100%',
                paddingHorizontal: 20,
              }}>
                <ScrollView
                      ref={scrollViewRef}
                      onScroll={handleOnScroll}
                      scrollEventThrottle={16}
                // contentContainerStyle={{backgroundColor:'red',flex:1}}
                >
                <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: verticalScale(10),
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: 'grey',
                }}>
                <Text style={[styles.bottomSheetButtonText]}>Filter</Text>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.closeImage}>
                  <Image
                    source={require('../../assets/images/close.png')}
                    resizeMode="contain"
                    style={styles.FilterImage}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    filterItemsName()
                    setShowItem(!showitem);
                  }}
                  style={[{ width: '100%', marginVertical: verticalScale(15) }]}>
                  <Text style={[styles.bottomSheetButtonText]}>
                    {showitem ? '-' : '+'} Filter By Item
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    marginHorizontal: 5,
                  }}>
                  {showitem
                    ? filterItemsList?.map(item => {
                      return (
                        <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.filterButton,
                          selectedFilterTypes.includes(item.itemName) && styles.filterButtonSelected,
                        ]}
                        onPress={() => handleFilterButtonClick(item.itemName, 'item')}
                      >
                     <Text style={{ color: selectedFilterTypes.includes(item.itemName) ? '#146C93' : '#000', fontSize: moderateScale(12) }}>
                            {item?.itemName}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                    : null}
                </View>

                <TouchableOpacity
                  onPress={() => {
                  filterMetalName()
                    setMetal(!showmetal);

                    // setAllSelecteditem(true);
                  }}
                  style={[{ width: '100%', marginVertical: verticalScale(15) }]}>
                  <Text style={[styles.bottomSheetButtonText]}>
                    {showmetal ? '-' : '+'} Filter By Metal
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                  }}>
                  {showmetal
                    ? metalcatalogList?.map(item => {
                      return (
                        <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.filterButton,
                          selectedFilterMetals.includes(item.metalCode) && styles.filterButtonSelected,
                        ]}
                        onPress={() => handleFilterButtonClick(item.metalCode, 'metal')}
                      >
                <Text style={{ color: selectedFilterMetals.includes(item.metalCode) ? '#146C93' : '#000', fontSize: moderateScale(12) }}>
                            {item?.metalCode}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                    : null}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  filterCollectionName()
                  setShowCollection(!showcollection);
                }}
                style={[{ width: '100%', marginVertical: verticalScale(15) }]}>
                <Text style={[styles.bottomSheetButtonText]}>
                  {showcollection ? '-' : '+'} Filter By Collection
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {showcollection &&
                  FilterCollections?.map(item => (
                    <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.filterButton,
                      selectedFilterCollections.includes(item.styleName) && styles.filterButtonSelected,
                    ]}
                    onPress={() => handleFilterButtonClick(item.styleName, 'collection')}
                  >
              <Text style={{ color: selectedFilterCollections.includes(item.styleName) ? '#146C93' : '#000', fontSize: moderateScale(12) }}>
                        {item?.styleName}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>

              </ScrollView>
         
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',

                  right: 20,
                  justifyContent: 'space-between',
                  position: 'absolute',
                  bottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    applyFilters();
                  }}
                  style={[styles.bottomSheetButton, { width: '42%' }]}>
                  <Text style={[styles.bottomSheetButtonText]}>
                    Apply Filter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedFilterMetals([]);
                    setSelectedFilterTypes([]);
                    setSelectedFilterCollections([]);
                    setProducts(oldData);
                    setModalVisible(false);
               
                  }}
                  style={[styles.bottomSheetButton, { width: '42%' }]}>
                  <Text style={[styles.bottomSheetButtonText]}>
                    Clear Filter
                  </Text>
                </TouchableOpacity>
              </View>
       
            </View>
          </Modal>

          {listView ? (
            <ListView
              products={products}
              // handleShareClick={handleShareClick}
              // handleWishlistClick={handleWishlistClick}
              clickwishlist={clickwishlist}
              clickShare={selectedForShare}
              Allselecteddata={Allselecteddata}
              Allselecteditem={Allselecteditem}

            />
          ) : (
            <GridView
              products={products}
              // handleShareClick={handleShareClick}
              // handleWishlistClick={handleWishlistClick}
              clickwishlist={clickwishlist}
              clickShare={selectedForShare}
              Allselecteddata={Allselecteddata}
              Allselecteditem={Allselecteditem}

            />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default Catalog;
