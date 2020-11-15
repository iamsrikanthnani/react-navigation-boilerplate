import React, {useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 1,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Suu Pham',
    isMine: true,
    isSeen: false,
    message:
      'Bug - Cannot select Supplier after selecting Plant name in Manage Job/ External plant.',
  },
  {
    id: 2,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Hoang Ho',
    message: 'LS-597 - Enhancement - Web Admin - Cache API get roles',
    isMine: false,
    isSeen: false,
  },
  {
    id: 3,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Anh Doan',
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
    isMine: false,
    isSeen: false,
  },
  {
    id: 4,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Anh Doan',
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
    isMine: false,
    isSeen: false,
  },
  {
    id: 5,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Anh Doan',
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
    isMine: false,
    isSeen: false,
  },
  {
    id: 6,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
    isMine: true,
    isSeen: false,
  },
  {
    id: 7,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Anh Doan',
    isMine: false,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 8,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Anh Doan',
    isMine: false,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 9,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Anh Doan',
    isMine: false,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 10,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Anh Doan',
    isMine: false,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 11,
    avatar:
      'https://f8.photo.talk.zdn.vn/2204131671421804425/fb6bccd9aeb252ec0ba3.jpg',
    sender: 'Anh Doan',
    isMine: false,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 12,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/200/200',
    sender: 'Anh Doan',
    isMine: true,
    isSeen: false,
    message:
      'LS-604 - In My Timesheet - Summary - Edit Mode - issue with description field',
  },
];

const ChatContent = ({route, navigation}) => {
  const {
    params: {item},
  } = route;

  const flatListRef = useRef();

  const renderItem = ({item, index}) => {
    return <View style={{flex: 1, height: 50, backgroundColor: 'red'}} />;
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: item.name,
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
          return (
            <View
              style={{
                height: 80,
                margin: 10,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={num}>
              <Text>{num}</Text>
            </View>
          );
        })}
      </ScrollView>
      <KeyboardAvoidingView
        style={{
          backgroundColor: 'orange',
        }}
        behavior="position">
        <TextInput
          style={{
            height: 40,
            width: '100%',
            backgroundColor: '#fff',
            paddingLeft: 10,
            justifySelf: 'flex-end',
            color: '#fff',
          }}
          placeholder={'Enter text here'}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatContent;
