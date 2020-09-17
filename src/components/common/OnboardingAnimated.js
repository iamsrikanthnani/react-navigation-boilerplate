import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {RectButton} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  multiply,
} from 'react-native-reanimated';
import {interpolateColor, useScrollHandler} from 'react-native-redash';
import {appFonts} from '../../fonts';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: 0.61 * height,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flexDirection: 'row',
    flex: 1,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: appFonts.bold,
  },
  descriptionStyle: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    fontSize: 16,
    fontFamily: appFonts.regular,
    paddingTop: 20,
    paddingBottom: 40,
  },
  buttonContainer: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: appFonts.regular,
    color: 'white',
  },
});

const OnBoardingAnimated = ({
  screens,
  onComplete,
  renderContent,
  buttonNextTitle,
  buttonCompleteTitle,
  footerContainerStyle,
  titleStyle,
  descriptionStyle,
  buttonContainerStyle,
  buttonTextStyle,
}) => {
  const scroll = useRef(null);
  const {scrollHandler, x} = useScrollHandler();

  const backgroundColor = interpolateColor(x, {
    inputRange: screens.map((_, index) => index * width),
    outputRange: screens.map(({color}) => color),
    extrapolate: Extrapolate.CLAMP,
  });

  const getAnimatedTextStyle = (index, style) => {
    const animatedValue = interpolate(x, {
      inputRange: [index * width, (index + 1) * width],
      outputRange: [0, width],
    });

    const animateInputRange = [(-1 * width) / 2, 0, width / 2];

    const paragraphAnimateStyle = [
      style,
      {
        transform: [
          {
            translateX: interpolate(animatedValue, {
              inputRange: animateInputRange,
              outputRange: [width / 2 + 10, 0, (-1 * width) / 2 - 10],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
        ],
        opacity: interpolate(animatedValue, {
          inputRange: animateInputRange,
          outputRange: [0, 1, 0],
        }),
      },
    ];
    return paragraphAnimateStyle;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <Animated.View style={[styles.slider, {backgroundColor}]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          {...scrollHandler}>
          {screens.map((item, index) => {
            return (
              <View style={{width}} key={index}>
                {renderContent && renderContent(item)}
              </View>
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * screens.length,
              transform: [{translateX: multiply(x, -1)}],
            },
          ]}>
          {screens.map(({title, description}, index) => {
            const last = index === screens.length - 1;
            return (
              <View
                key={index}
                style={[styles.footerContainer, footerContainerStyle]}>
                <Animated.Text style={[styles.titleStyle, titleStyle]}>
                  {title}
                </Animated.Text>
                <Animated.Text
                  style={getAnimatedTextStyle(index, [
                    styles.descriptionStyle,
                    descriptionStyle,
                  ])}>
                  {description}
                </Animated.Text>
                <RectButton
                  onPress={() => {
                    if (last) {
                      onComplete && onComplete();
                    } else {
                      scroll.current
                        ?.getNode()
                        .scrollTo({x: width * (index + 1), animated: true});
                    }
                  }}
                  style={[styles.buttonContainer, buttonContainerStyle]}>
                  <Text style={[styles.buttonText, buttonTextStyle]}>
                    {last ? buttonCompleteTitle : buttonNextTitle}
                  </Text>
                </RectButton>
              </View>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
};

OnBoardingAnimated.defaultProps = {
  buttonCompleteTitle: 'Get Started',
  buttonNextTitle: 'Next',
  onComplete: () => {},
  screens: [],
  renderContent: () => {},
};

OnBoardingAnimated.propTypes = {
  screens: PropTypes.array.isRequired,
  onComplete: PropTypes.func,
  renderContent: PropTypes.func,
  buttonNextTitle: PropTypes.string,
  buttonCompleteTitle: PropTypes.string,
  footerContainerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  descriptionStyle: PropTypes.any,
  buttonContainerStyle: PropTypes.any,
  buttonTextStyle: PropTypes.any,
};

export default OnBoardingAnimated;
