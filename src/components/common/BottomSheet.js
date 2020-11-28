import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
} from 'react-native';
import COLORS from 'theme/colors';

const SUPPORTED_ORIENTATIONS = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

const BottomSheet = forwardRef((props, ref) => {
  const [isVisible, setVisible] = useState(false);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));
  const pan = useRef(new Animated.ValueXY()).current;

  const {
    height,
    minClosingHeight,
    openDuration,
    closeDuration,
    onClose,
    onOpen,
    animationType,
    closeOnDragDown,
    dragFromTopOnly,
    closeOnPressMask,
    closeOnPressBack,
    children,
    customStyles,
    keyboardAvoidingViewEnabled,
  } = props;

  const setModalVisible = (visible) => {
    if (visible) {
      setVisible(visible);
      if (typeof onOpen === 'function') {
        onOpen(props);
      }
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: height,
        duration: openDuration,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: minClosingHeight,
        duration: closeDuration,
      }).start(() => {
        pan.setValue({x: 0, y: 0});
        setVisible(visible);
        setAnimatedHeight(new Animated.Value(0));
        if (typeof onClose === 'function') {
          onClose(props);
        }
      });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(
            e,
            gestureState,
          );
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (height / 4 - gestureState.dy < 0) {
          setModalVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  useImperativeHandle(ref, () => ({
    openModal() {
      setModalVisible(true);
    },
    closeModal() {
      setModalVisible(false);
    },
  }));

  const panStyle = {
    transform: pan.getTranslateTransform(),
  };

  return (
    <Modal
      transparent
      animationType={animationType}
      visible={isVisible}
      supportedOrientations={SUPPORTED_ORIENTATIONS}
      onRequestClose={() => {
        closeOnPressBack && setModalVisible(false);
      }}>
      <KeyboardAvoidingView
        enabled={keyboardAvoidingViewEnabled}
        behavior="padding"
        style={[styles.wrapper, customStyles.wrapper]}>
        <TouchableOpacity
          style={styles.mask}
          activeOpacity={1}
          onPress={() => (closeOnPressMask ? setModalVisible(false) : null)}
        />
        <Animated.View
          {...(!dragFromTopOnly && panResponder.panHandlers)}
          style={[
            panStyle,
            styles.container,
            {height: animatedHeight},
            customStyles.container,
          ]}>
          {closeOnDragDown && (
            <View
              {...(dragFromTopOnly && panResponder.panHandlers)}
              style={[
                styles.draggableContainer,
                customStyles.draggableContainer,
              ]}>
              <View
                style={[styles.draggableIcon, customStyles.draggableIcon]}
              />
            </View>
          )}
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

BottomSheet.propTypes = {
  animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
  height: PropTypes.number,
  minClosingHeight: PropTypes.number,
  openDuration: PropTypes.number,
  closeDuration: PropTypes.number,
  closeOnDragDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  dragFromTopOnly: PropTypes.bool,
  closeOnPressBack: PropTypes.bool,
  keyboardAvoidingViewEnabled: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  children: PropTypes.node,
};

BottomSheet.defaultProps = {
  animationType: 'fade',
  height: 260,
  minClosingHeight: 0,
  openDuration: 200,
  closeDuration: 200,
  closeOnDragDown: false,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === 'ios',
  customStyles: {},
  onClose: null,
  onOpen: null,
  children: <View />,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.shadow,
  },
  mask: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 0,
    overflow: 'hidden',
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: COLORS.grey,
  },
});

export default BottomSheet;
