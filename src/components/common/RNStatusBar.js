import React from 'react';
import {StatusBar} from 'react-native';

const RNStatusBar = ({theme, ...props}) => {
  const isDarkMode = theme === 'dark';
  return (
    <StatusBar
      {...props}
      animated
      networkActivityIndicatorVisible
      backgroundColor={isDarkMode ? 'black' : 'white'}
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    />
  );
};

RNStatusBar.propTypes = {};

RNStatusBar.defaultProps = {};

export default RNStatusBar;
