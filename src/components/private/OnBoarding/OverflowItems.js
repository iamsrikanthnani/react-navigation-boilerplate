import React from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {RNText} from '../../common';

const OVERFLOW_HEIGHT = 80;
const SPACING = 10;

const OverflowItems = ({data, scrollXAnimated, theme}) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <RNText style={styles.title} font="bold" numberOfLines={1}>
                {item.title}
              </RNText>
              <RNText style={styles.location}>{item.location}</RNText>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  title: {
    fontSize: 28,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
});

export default OverflowItems;
