import React, {forwardRef, useImperativeHandle} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {APP_FONTS} from '../../fonts';

const RNTextInput = forwardRef(
  (
    {
      style,
      font,
      clearButtonMode,
      editable,
      keyboardType,
      maxLength,
      onBlur,
      onChangeText,
      onFocus,
      onKeyPress,
      placeholder,
      placeholderTextColor,
      textAlign,
      onSubmitEditing,
      returnKeyType,
      secureTextEntry,
      ...props
    },
    inputRef,
  ) => {
    const {colors} = useTheme();

    const defaultStyle = {
      color: colors.text,
      fontFamily: APP_FONTS[font] || APP_FONTS.regular,
      height: 50,
      paddingHorizontal: 20,
      fontSize: 16,
      borderRadius: 25,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.text,
    };

    useImperativeHandle(inputRef, () => ({
      getCurrentText() {
        return 'hihi';
      },
    }));

    return (
      <TextInput
        {...props}
        ref={inputRef}
        style={[defaultStyle, style]}
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit
        enablesReturnKeyAutomatically
        {...{
          editable,
          clearButtonMode,
          keyboardType,
          maxLength,
          onBlur,
          onChangeText,
          onFocus,
          onKeyPress,
          placeholder,
          placeholderTextColor,
          textAlign,
          onSubmitEditing,
          returnKeyType,
          secureTextEntry,
        }}
      />
    );
  },
);

export default RNTextInput;
