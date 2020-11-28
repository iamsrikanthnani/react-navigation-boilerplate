import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, FlatList, Animated, View} from 'react-native';
const {width} = Dimensions.get('screen');
import COLORS from 'theme/colors';
import {FONT_FAMILY} from 'theme/fonts';

const ScrollableTabbar = ({initialIndex, data, onChange, ...props}) => {
  const [active, setActive] = useState(null);
  const animatedValue = useRef(new Animated.Value(1));
  const menuRef = useRef();

  useEffect(() => {
    initialIndex && selectMenu(initialIndex);
  }, []);

  const animate = () => {
    animatedValue.current?.setValue(0);

    Animated.timing(animatedValue.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // color not supported
    }).start();
  };

  const onScrollToIndexFailed = () => {
    menuRef.current?.scrollToIndex({
      index: 0,
      viewPosition: 0.5,
    });
  };

  const selectMenu = (id) => {
    setActive(id);

    menuRef.current?.scrollToIndex({
      index: data.findIndex((item) => item.id === id),
      viewPosition: 0.5,
    });
    animate();
    onChange && onChange(id);
  };

  const renderItem = ({item}) => {
    const isActive = active === item.id;

    const textColor = animatedValue.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.muted, isActive ? COLORS.primary : COLORS.muted],
      extrapolate: 'clamp',
    });

    const width = animatedValue.current?.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', isActive ? '100%' : '0%'],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.titleContainer}>
        <Animated.Text
          style={[styles.menuTitle, {color: textColor}]}
          onPress={() => selectMenu(item.id)}>
          {item.title}
        </Animated.Text>
        <Animated.View
          style={{
            height: 2,
            width,
            backgroundColor: COLORS.primary,
          }}
        />
      </View>
    );
  };

  const renderMenu = () => {
    return (
      <FlatList
        {...props}
        data={data}
        horizontal={true}
        ref={menuRef}
        extraData={active}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={onScrollToIndexFailed}
        renderItem={renderItem}
        contentContainerStyle={styles.menu}
      />
    );
  };

  return <View style={[styles.container, styles.shadow]}>{renderMenu()}</View>;
};

ScrollableTabbar.defaultProps = {
  data: [],
  initialIndex: 0,
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingHorizontal: 16 * 2.5,
    paddingTop: 8,
  },
  titleContainer: {
    alignItems: 'center',
  },
  menuTitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 16,
    padding: 16,
    color: COLORS.muted,
  },
});

export default ScrollableTabbar;
