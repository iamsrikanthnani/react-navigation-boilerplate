import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';

const KeyboardContainer = ({
  style,
  contentContainerStyle,
  children,
  loading = false,
}) => {
  const {colors} = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.keyboardContainer, style]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {children}
        </View>
        <Modal
          animated
          animationType="fade"
          hardwareAccelerated
          statusBarTranslucent
          presentationStyle="overFullScreen"
          transparent
          visible={loading}>
          <View style={styles.modalLoading}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color={colors.text}
            />
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  modalLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

KeyboardContainer.propTypes = {
  style: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  children: PropTypes.node,
};

KeyboardContainer.defaultProps = {};

export default KeyboardContainer;
