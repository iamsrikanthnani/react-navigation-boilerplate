import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const Press = ({}) => {
  return (
    <Pressable
      onPress={() => {}}
      android_ripple={{
        color: 'red',
        radius: 15,
        borderless: true,
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
      ]}>
      {({pressed}) => <Text>{pressed ? 'Pressed!' : 'Press Me'}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default Press;
