import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RNText, Avatar} from 'components/common';

const LoveInfo = ({image, fullName, age = 20, linearColors}) => {
  return (
    <View style={styles.container}>
      <Avatar linearColors={linearColors} imageUrl={image} />
      <RNText style={styles.fullName} font="medium">
        {fullName}
      </RNText>
      <RNText>{`${age} years old`}</RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  fullName: {
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 16,
  },
});

export default LoveInfo;
