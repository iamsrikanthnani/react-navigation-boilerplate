import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Chat, ChatContent} from 'screens';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from 'theme/fonts';

const ChatStack = createStackNavigator();

const ChatTab = () => {
  const {colors} = useTheme();
  const backButton =
    Platform.OS === 'ios' ? 'chevron-back-outline' : 'arrow-back-outline';
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 16, fontFamily: FONT_FAMILY.regular},
        headerBackTitleVisible: false,
        headerBackImage: () => {
          return (
            <IonIcons
              name={backButton}
              size={30}
              color={colors.text}
              style={styles.backButton}
            />
          );
        },
      }}>
      <ChatStack.Screen name="Chat" component={Chat} />
      <ChatStack.Screen name="ChatContent" component={ChatContent} />
    </ChatStack.Navigator>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
});

export default ChatTab;
