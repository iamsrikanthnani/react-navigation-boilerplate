import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';

const Avatar = ({linearColors, imageUrl, borderColor, size}) => {
  const {colors} = useTheme();
  const defaultBorderColor = colors.background;
  return (
    <LinearGradient
      colors={linearColors}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      style={[
        styles.linearAvatar,
        {width: size + 6, height: size + 6, borderRadius: (size + 6) / 2},
      ]}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={[
          styles.avatar,
          {
            borderColor: borderColor || defaultBorderColor,
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
    </LinearGradient>
  );
};

Avatar.defaultProps = {
  linearColors: ['#CA1D7E', '#E35157', '#F2703F'],
  imageUrl:
    'https://scontent.fdad1-1.fna.fbcdn.net/v/t1.0-9/20663932_1880782902240326_55579579179121101_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=X9UeaweW680AX_qcJ_o&_nc_ht=scontent.fdad1-1.fna&oh=2f4d533cc2735beba6e9b2ea7cdb1ce2&oe=5FAA51AE',
  size: 80,
};

Avatar.propTypes = {
  linearColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  size: PropTypes.number,
};

const styles = StyleSheet.create({
  linearAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Avatar;
