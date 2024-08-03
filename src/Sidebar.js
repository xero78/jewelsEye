import React from 'react';
import {Button, Dimensions, StyleSheet, View, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const {width} = Dimensions.get('screen');

export default function Sidebar() {
  const translateX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const onPress = () =>
    (translateX.value = withTiming(
      translateX.value < width / 2 ? width - 0 : 100,
    ));

  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <Animated.View style={[styles.box, animatedStyles]}>
        <View style={styles.buttonContainer}>
          <Button
            title="Click Me"
            onPress={() => console.log('Button Pressed')}
          />
        </View>
      </Animated.View>
      <Button title="toggle  (with Timing)" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  box: {
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
  },
});
