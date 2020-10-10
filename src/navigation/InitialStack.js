import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Platform, StyleSheet} from 'react-native';
import {OnBoarding, Login, SignUp} from '../screens';
import {APP_FONTS} from '../fonts';

const InitStack = createStackNavigator();

const InitialStack = () => {
  const {colors} = useTheme();
  const backButton =
    Platform.OS === 'ios' ? 'chevron-back-outline' : 'arrow-back-outline';

  return (
    <InitStack.Navigator
      screenOptions={{
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
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: APP_FONTS.semibold,
        },
      }}>
      <InitStack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />
      <InitStack.Screen name="Login" component={Login} />
      <InitStack.Screen name="SignUp" component={SignUp} />
    </InitStack.Navigator>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
});

export default InitialStack;
