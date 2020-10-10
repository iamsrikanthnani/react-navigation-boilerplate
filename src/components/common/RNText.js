import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {APP_FONTS} from '../../fonts';

const RNText = ({children, style, font, ...props}) => {
  const {colors} = useTheme();

  const defaultStyle = {
    color: colors.text,
    fontFamily: APP_FONTS[font] || APP_FONTS.regular,
  };

  return (
    <Text {...props} allowFontScaling={false} style={[defaultStyle, style]}>
      {children}
    </Text>
  );
};

export default RNText;
