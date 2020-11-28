import React, {useState, forwardRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {BottomSheet, RNText} from 'components/common';
import COLORS from 'theme/colors';

const DatePickerModal = forwardRef((props, ref) => {
  const {defaultDate, onDone, onClose, configs = {}} = props;
  const {
    title = 'Select time',
    confirmText = 'SELECT',
    cancelText = 'Cancel',
  } = configs;

  const [date, setDate] = useState(defaultDate || new Date());

  const onPickUp = () => {
    onDone && onDone(date);
    onClose && onClose();
  };

  return (
    <BottomSheet
      ref={ref}
      height={400}
      closeOnDragDown
      customStyles={{
        container: styles.bottomSheetContainer,
      }}>
      <View style={styles.gridContainer}>
        <RNText font="light" style={styles.title}>
          {title}
        </RNText>
        <DatePicker date={date} onDateChange={setDate} {...props} />
        <View style={styles.button}>
          <TouchableOpacity style={styles.activeButton} onPress={onPickUp}>
            <RNText font="medium" style={styles.activeButtonText}>
              {confirmText}
            </RNText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inActiveButton} onPress={onClose}>
            <RNText font="medium" style={styles.inActiveButtonText}>
              {cancelText}
            </RNText>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  title: {
    fontSize: 16,
    paddingBottom: 10,
    color: COLORS.black,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});

export default DatePickerModal;
