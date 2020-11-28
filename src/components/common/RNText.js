import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from 'theme/fonts';

const RNText = ({children, style, font, ...props}) => {
  const {colors} = useTheme();

  const defaultStyle = {
    color: colors.text,
    fontFamily: FONT_FAMILY[font] || FONT_FAMILY.regular,
  };

  return (
    <Text {...props} allowFontScaling={false} style={[defaultStyle, style]}>
      {children}
    </Text>
  );
};

export default RNText;
