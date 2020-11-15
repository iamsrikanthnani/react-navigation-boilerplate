import React from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  Switch,
  Appearance,
  Linking,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {AlertModal, Photo, Press} from 'components/common';

const supportedURL = 'https://google.com';

const unsupportedURL = 'https://messenger.com';

const useMount = (func) => React.useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = React.useState(null);
  const [processing, setProcessing] = React.useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return {url, processing};
};

const OpenURLButton = ({url, children}) => {
  const handlePress = React.useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const Task = ({}) => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const {url: initialUrl, processing} = useInitialURL();
  const [isVisible, setVisible] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      {/* <Text>TaskManagement</Text> */}
      {/* <Button title="Open modal" onPress={() => setVisible(true)} /> */}
      <Photo
        source={{
          uri:
            'https://avatar-nct.nixcdn.com/song/2019/10/21/4/6/1/e/1571623691373_640.jpg',
        }}
        placeholderColor={'#86A8E7'}
        style={{
          height: 80,
          width: 80,
          borderRadius: 160,
          alignSelf: 'center',
        }}
        delay={5000}
      />
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Press />
      <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
      <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
      <Button title="request permissions" onPress={requestCameraPermission} />
      <AlertModal
        visible={isVisible}
        title="Alert"
        message="This is description"
        actions={[
          {
            text: 'Đồng ý',
            onPress: () => {
              setVisible(false);
            },
          },
          {
            text: 'Huỷ bỏ',
            onPress: () => {},
          },
        ]}
      />
    </View>
  );
};

export default Task;
