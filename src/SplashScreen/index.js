import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animationDuration = 3000;

    const zoomIn = Animated.timing(scaleValue, {
      toValue: 1.5,
      duration: 1000,
      useNativeDriver: true,
    });

    const zoomOut = Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    const zoomSequence = Animated.sequence([zoomIn, zoomOut]);
    const loopAnimation = Animated.loop(zoomSequence, {iterations: 2});

    loopAnimation.start(() => {
      navigation.navigate('ServerIp');
    });

    return () => {
      loopAnimation.stop();
    };
  }, [navigation, scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/jewelseye.png')}
        resizeMode={'contain'}
        style={[styles.image, {transform: [{scale: scaleValue}]}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 170,
    height: 170,
  },
});

export default SplashScreen;
