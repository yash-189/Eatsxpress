import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const Example = () => {
  const animatedValue = useSharedValue(0);
  const boxRef = useRef(null);

  const startAnimation = () => {
    animatedValue.value = withSpring(1, { duration: 1000, useNativeDriver: true });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      transform: [{ translateY: animatedValue.value * 100 }]
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startAnimation}>
        <Text style={styles.button}>Animate</Text>
      </TouchableOpacity>
      <Animated.View ref={boxRef} style={[styles.box, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default Example;
