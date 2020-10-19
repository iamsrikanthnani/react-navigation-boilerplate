import React from 'react';
import {Modal, View, StyleSheet, TouchableOpacity} from 'react-native';
import {RNText} from 'components/common';
import {COLORS} from 'utils';

const AlertModal = ({
  visible,
  animationType = 'fade',
  title = 'Alert',
  message = 'This is description',
  actions = [],
}) => {
  return (
    <Modal transparent animationType={animationType} visible={visible}>
      <View style={styles.container}>
        <View style={styles.alertModal}>
          <RNText font="bold" style={styles.title}>
            {title}
          </RNText>
          <RNText font="regular" style={styles.message}>
            {message}
          </RNText>
          {actions[0] && (
            <TouchableOpacity
              style={styles.activeButton}
              onPress={actions[0]?.onPress}>
              <RNText font="medium" style={styles.activeButtonText}>
                {actions[0]?.text}
              </RNText>
            </TouchableOpacity>
          )}
          {actions[1] && (
            <TouchableOpacity
              style={styles.inActiveButton}
              onPress={actions[1]?.onPress}>
              <RNText font="medium" style={styles.inActiveButtonText}>
                {actions[1]?.text}
              </RNText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.shadow,
    justifyContent: 'center',
  },
  alertModal: {
    width: '70%',
    alignSelf: 'center',
    borderRadius: 8,
    paddingVertical: 18,
    backgroundColor: COLORS.white,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
  },
  message: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    color: COLORS.black,
  },
  activeButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 30,
  },
  activeButtonText: {
    textAlign: 'center',
    color: COLORS.white,
    paddingVertical: 14,
  },
  inActiveButton: {
    marginTop: 12,
  },
  inActiveButtonText: {
    textAlign: 'center',
    color: COLORS.black,
  },
});

export default AlertModal;
