import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  KeyboardContainer,
  BottomSheet,
  RNText,
  DatePickerModal,
} from 'components/common';
import {LoveInfo, DatingTime, TimeDistance} from 'components/private';
import AppIcon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS} from 'utils';

const LIST_FUNCTIONS = [
  {id: 1, name: 'Update my profile', icon: 'ios-person-outline'},
  {id: 2, name: "Update lover's info", icon: 'ios-heart-outline'},
  {id: 3, name: 'Update dating time', icon: 'ios-calendar-outline'},
];

const LoveItem = ({item, onPress}) => {
  const onPressItem = () => {
    onPress && onPress(item);
  };

  return (
    <TouchableOpacity onPress={onPressItem} style={styles.loveItemContainer}>
      <AppIcon name={item.icon} color={COLORS.black} size={22} />
      <RNText style={styles.loveItemText}>{item.name}</RNText>
    </TouchableOpacity>
  );
};

const Love = ({navigation}) => {
  const [dating, setDating] = useState(new Date());

  const bottomSheetRef = React.useRef();
  const datePickerRef = React.useRef();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => bottomSheetRef.current.openModal()}>
          <AppIcon
            name="ios-lock-open-outline"
            size={20}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: {
        marginRight: 20,
      },
    });
  }, [navigation]);

  const onUpdateProfile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };
  const onUpdateLoverInfo = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch((e) => {
        alert(e);
      });
  };
  const onUpdateDatingTime = () => {
    datePickerRef.current.openModal();
  };

  const onFunctionPress = (item) => {
    bottomSheetRef.current.closeModal();
    setTimeout(() => {
      switch (item.id) {
        case 1:
          onUpdateProfile();
          break;
        case 2:
          onUpdateLoverInfo();
          break;
        case 3:
          onUpdateDatingTime();
          break;
        default:
          break;
      }
    }, 500);
  };

  return (
    <KeyboardContainer>
      <View style={styles.coupleInfo}>
        <LoveInfo
          fullName="Suu Pham"
          age={23}
          linearColors={['#7F7FD5', '#86A8E7', '#91EAE4']}
        />
        <Icon name="ios-heart" size={50} color={'red'} />
        <LoveInfo
          fullName="Thi Nguyen"
          age={23}
          image={
            'https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/79748009_3184271528464998_2671714492722708480_o.jpg?_nc_cat=107&_nc_sid=174925&_nc_ohc=wXUxJAM-oGAAX-VedRr&_nc_ht=scontent.fdad2-1.fna&oh=a1cb9c4ae867fefda2bd9cdb1c8a5d3f&oe=5FACCAED'
          }
        />
      </View>

      <View style={styles.timeInfo}>
        <DatingTime title="Start dating" date={dating} />
        <DatingTime title="Now" isCountAutomatically style={styles.now} />
      </View>
      <TimeDistance start={dating} />
      <BottomSheet
        ref={bottomSheetRef}
        closeOnDragDown
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}>
        <ScrollView>
          <View style={styles.gridContainer}>
            {LIST_FUNCTIONS.map((item, index) => (
              <LoveItem key={index} item={item} onPress={onFunctionPress} />
            ))}
          </View>
        </ScrollView>
      </BottomSheet>
      <DatePickerModal
        ref={datePickerRef}
        mode="date"
        onDone={(date) => setDating(date)}
        onClose={() => datePickerRef.current.closeModal()}
      />
    </KeyboardContainer>
  );
};

const styles = StyleSheet.create({
  coupleInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  timeInfo: {
    paddingVertical: 30,
  },
  gridContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  loveItemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  loveItemText: {
    color: COLORS.black,
    flex: 1,
    paddingLeft: 8,
    fontSize: 16,
  },
  now: {
    marginTop: 40,
  },
});

export default Love;
