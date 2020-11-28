import React, {forwardRef, useImperativeHandle} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {RNText} from 'components/common';
import {FONT_FAMILY} from 'theme/fonts';

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
      error,
      touched,
      ...props
    },
    inputRef,
  ) => {
    const {colors} = useTheme();

    const defaultStyle = {
      color: colors.text,
      fontFamily: FONT_FAMILY[font] || FONT_FAMILY.regular,
      height: 50,
      paddingHorizontal: 20,
      fontSize: 16,
      borderRadius: 25,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: touched && error ? 'red' : colors.text,
    };

    useImperativeHandle(inputRef, () => ({
      focus() {
        return inputRef.current.focus();
      },
      blur() {
        return inputRef.current.blur();
      },
      clear() {
        return inputRef.current.clear();
      },
    }));

    return (
      <View>
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
        {touched && error && (
          <RNText font="light" style={styles.errorText}>
            {error}
          </RNText>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  errorText: {
    paddingTop: 8,
    fontSize: 12,
    paddingLeft: 20,
  },
});

export default RNTextInput;
